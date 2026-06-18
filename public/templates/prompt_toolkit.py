# prompt_toolkit.py  ──  Core prompt engineering patterns
# pip install openai
#
# Prompt engineering is how you control LLM behaviour without fine-tuning.
#
# Patterns included:
#   • Chain-of-Thought (CoT) — add "Think step by step" to improve reasoning
#                              accuracy on math/logic tasks.
#   • Few-Shot              — provide 2-3 examples so the model learns your
#                              desired output format.
#   • JSON Mode              — force the model to return valid JSON
#                              (no markdown fences, no extra prose).
#   • Self-Consistency       — run the same prompt N times and take the
#                              majority answer (reduces hallucination).
#
# Rule of thumb: CoT for reasoning, few-shot for format, JSON mode for
# structured data, self-consistency for high-stakes single answers.

import os
import json
from collections import Counter
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def _call(messages, model="gpt-4o-mini", **kw):
    return client.chat.completions.create(model=model, messages=messages, **kw)


# ── Pattern 1: Chain-of-Thought ────────────────────────────────
def chain_of_thought(question: str) -> str:
    msg = [{"role": "user", "content": f"{question}\nThink step by step before answering."}]
    return _call(msg).choices[0].message.content


# ── Pattern 2: Few-Shot ────────────────────────────────────────
def few_shot(task: str, examples: list[dict], new_input: str) -> str:
    """examples = [{"input": "...", "output": "..."}, ...]"""
    shots = "\n".join(f'Input: {e["input"]}\nOutput: {e["output"]}' for e in examples)
    msg = [{"role": "user", "content": f"{task}\n\n{shots}\n\nInput: {new_input}\nOutput:"}]
    return _call(msg).choices[0].message.content


# ── Pattern 3: JSON Mode ───────────────────────────────────────
def json_output(prompt: str, schema_hint: str) -> dict:
    """Forces the model to return valid JSON matching schema_hint description."""
    system = f"You are a JSON API. Return ONLY valid JSON matching this schema:\n{schema_hint}"
    msg = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    raw = _call(msg, response_format={"type": "json_object"}).choices[0].message.content
    return json.loads(raw)


# ── Pattern 4: Self-Consistency ────────────────────────────────
def self_consistency(question: str, n: int = 5) -> str:
    """Runs the question N times, returns the majority answer. Best for factual/math."""
    answers = []
    for _ in range(n):
        msg = [{"role": "user", "content": question}]
        ans = _call(msg, temperature=0.9).choices[0].message.content.strip()
        answers.append(ans)
    return Counter(answers).most_common(1)[0][0]


# ── Demo ───────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=== Chain-of-Thought ===")
    print(chain_of_thought("If a train travels 60 km/h for 2.5 hours, how far does it go?"))

    print("\n=== JSON Mode ===")
    schema = '{"name": string, "age": number, "skills": [string]}'
    data = json_output("Extract info: Rashish is 17, knows Python and Next.js", schema)
    print(data)
