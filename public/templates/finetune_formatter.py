# finetune_formatter.py  ──  Prep & launch an OpenAI fine-tune
# pip install openai tiktoken
#
# Fine-tuning = training a model on YOUR data so it adopts your style/domain.
#
# When to fine-tune (instead of RAG):
#   • You need a consistent tone/style (e.g. a customer support bot).
#   • Domain vocabulary the base model doesn't know (medical, legal, niche).
#   • Latency matters and you can't afford a long system prompt every call.
#
# This script:
#   1. Takes a list of {"prompt": ..., "response": ...} dicts.
#   2. Formats them into OpenAI's required chat JSONL structure.
#   3. Counts tokens so you can estimate cost.
#   4. Splits 90/10 train/val and writes both files.
#   5. Uploads the files and starts the fine-tune job.

import os
import json
import random
from openai import OpenAI
import tiktoken

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
enc = tiktoken.encoding_for_model("gpt-4o-mini")


def count_tokens(messages: list[dict]) -> int:
    return sum(len(enc.encode(m["content"])) for m in messages)


# ── 1. Format raw pairs into chat-style JSONL records ──────────
def format_pairs(pairs: list[dict], system: str = "You are a helpful assistant.") -> list[dict]:
    """pairs = [{"prompt": "...", "response": "..."}, ...]"""
    formatted, total_tokens = [], 0
    for p in pairs:
        msgs = [
            {"role": "system", "content": system},
            {"role": "user", "content": p["prompt"]},
            {"role": "assistant", "content": p["response"]},
        ]
        toks = count_tokens(msgs)
        if toks > 4096:
            print(f"Skipping long example ({toks} tokens)")
            continue
        total_tokens += toks
        formatted.append({"messages": msgs})
    est_cost = total_tokens / 1000 * 0.008
    print(f"Formatted {len(formatted)} examples | ~{total_tokens:,} tokens | est. cost: ${est_cost:.2f}")
    return formatted


# ── 2. Save to JSONL ───────────────────────────────────────────
def save_jsonl(data: list[dict], path: str):
    with open(path, "w") as f:
        for item in data:
            f.write(json.dumps(item) + "\n")


# ── 3. Upload & launch fine-tune ───────────────────────────────
def launch_finetune(train_path: str, val_path: str, model: str = "gpt-4o-mini-2024-07-18"):
    def upload(p):
        with open(p, "rb") as f:
            return client.files.create(file=f, purpose="fine-tune").id

    train_id = upload(train_path)
    val_id = upload(val_path)
    job = client.fine_tuning.jobs.create(
        training_file=train_id,
        validation_file=val_id,
        model=model,
    )
    print(f"Fine-tune started! Job ID: {job.id}")
    print(f"Check status with: client.fine_tuning.jobs.retrieve('{job.id}')")
    return job.id


# ── Demo ───────────────────────────────────────────────────────
if __name__ == "__main__":
    raw = [
        {"prompt": "What is gradient descent?",
         "response": "Gradient descent minimises a loss function by iteratively moving in the direction of steepest descent."},
        {"prompt": "Explain overfitting.",
         "response": "Overfitting is when a model memorises training data and fails to generalise to unseen examples."},
        # add hundreds more real examples for an actual fine-tune job...
    ]
    data = format_pairs(raw, system="You are an AI tutor explaining ML concepts clearly.")
    random.shuffle(data)
    split = int(len(data) * 0.9)
    save_jsonl(data[:split], "train.jsonl")
    save_jsonl(data[split:], "val.jsonl")
    # launch_finetune("train.jsonl", "val.jsonl")   # uncomment to actually launch
