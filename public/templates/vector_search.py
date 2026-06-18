# vector_search.py  ──  Embeddings & similarity search from scratch
# pip install numpy faiss-cpu openai
#
# Before reaching for ChromaDB or Pinecone, it helps to understand what
# they're actually doing under the hood.
#
# Part A — Cosine similarity from scratch with NumPy.
#          cos(A, B) = (A · B) / (||A|| × ||B||)
#          Result ranges from -1 (opposite) to 1 (identical).
#
# Part B — Brute-force k-NN (k nearest neighbours): embed a query, compare
#          it to every stored vector. O(n·d) — fine up to ~100K vectors.
#
# Part C — FAISS for scale: builds an index (e.g. IVF = inverted file) so
#          search is roughly O(log n) instead of O(n). This is what production
#          vector databases (Pinecone, Weaviate, ChromaDB) wrap internally.

import numpy as np
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ── Part A: Cosine similarity from scratch ─────────────────────
def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-10))


# ── Part B: Brute-force k-NN vector store ──────────────────────
class TinyVectorStore:
    def __init__(self):
        self.texts: list[str] = []
        self.vecs: list[np.ndarray] = []

    def _embed(self, text: str) -> np.ndarray:
        r = client.embeddings.create(model="text-embedding-3-small", input=[text])
        return np.array(r.data[0].embedding, dtype=np.float32)

    def add(self, text: str):
        self.texts.append(text)
        self.vecs.append(self._embed(text))

    def search(self, query: str, k: int = 3) -> list[tuple[str, float]]:
        q = self._embed(query)
        scored = [(self.texts[i], cosine_similarity(q, v)) for i, v in enumerate(self.vecs)]
        return sorted(scored, key=lambda x: -x[1])[:k]


# ── Part C: FAISS for scale (millions of vectors) ──────────────
def build_faiss_index(vectors: np.ndarray):
    import faiss
    d = vectors.shape[1]
    # Flat L2 index — exact, fastest for <1M vectors
    index = faiss.IndexFlatL2(d)
    # For millions of vectors, use IVF (approximate but much faster):
    # quantizer = faiss.IndexFlatL2(d)
    # index = faiss.IndexIVFFlat(quantizer, d, 100)
    # index.train(vectors)
    index.add(vectors)
    return index


def faiss_search(index, query_vec: np.ndarray, k: int = 5):
    query_vec = query_vec.reshape(1, -1).astype(np.float32)
    distances, indices = index.search(query_vec, k)
    return indices[0], distances[0]


# ── Demo ───────────────────────────────────────────────────────
if __name__ == "__main__":
    store = TinyVectorStore()
    docs = [
        "Machine learning is a subset of artificial intelligence.",
        "Python is great for data science and automation.",
        "Neural networks are inspired by the human brain.",
        "JEE Physics covers kinematics, optics, and thermodynamics.",
    ]
    for d in docs:
        store.add(d)

    results = store.search("How do AI systems learn?", k=2)
    for text, score in results:
        print(f"[{score:.3f}] {text}")
