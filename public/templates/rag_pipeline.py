# rag_pipeline.py  ──  Minimal RAG (Retrieval-Augmented Generation) with ChromaDB
# pip install openai chromadb pypdf2 tiktoken
#
# RAG = give the LLM relevant context from YOUR documents instead of relying
# purely on its training data.
#
# Steps:
#   1. Chunk  — split text into ~500-word pieces with overlap so sentences
#               aren't cut mid-thought.
#   2. Embed  — convert each chunk into a vector (1536-dim with
#               text-embedding-3-small).
#   3. Store  — save vectors in ChromaDB (runs locally, no server needed).
#   4. Query  — embed the user's question, find the top-k most similar chunks.
#   5. Prompt — inject those chunks into the LLM's context and ask it to answer.

import os
import uuid
import chromadb
from openai import OpenAI
from PyPDF2 import PdfReader

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
db = chromadb.Client()
col = db.get_or_create_collection("docs")


# ── 1. Chunk ───────────────────────────────────────────────────
def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    words, chunks = text.split(), []
    for i in range(0, len(words), size - overlap):
        chunks.append(" ".join(words[i: i + size]))
    return chunks


# ── 2. Embed ───────────────────────────────────────────────────
def embed(texts: list[str]) -> list[list[float]]:
    r = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return [d.embedding for d in r.data]


# ── 3. Ingest a PDF into the vector store ──────────────────────
def ingest_pdf(path: str):
    reader = PdfReader(path)
    text = " ".join(p.extract_text() or "" for p in reader.pages)
    chunks = chunk_text(text)
    vecs = embed(chunks)
    col.add(
        ids=[str(uuid.uuid4()) for _ in chunks],
        embeddings=vecs,
        documents=chunks,
    )
    print(f"Ingested {len(chunks)} chunks from {path}")


# ── 4 + 5. Query the store and ask the LLM ─────────────────────
def ask(question: str, k: int = 4) -> str:
    q_vec = embed([question])[0]
    results = col.query(query_embeddings=[q_vec], n_results=k)
    context = "\n\n".join(results["documents"][0])
    prompt = f"""Answer using ONLY the context below. If unsure, say so.

Context:
{context}

Question: {question}"""
    r = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return r.choices[0].message.content


# ── Run ────────────────────────────────────────────────────────
if __name__ == "__main__":
    # ingest_pdf("your_document.pdf")        # run this once per document
    print(ask("What is the main topic of the document?"))
