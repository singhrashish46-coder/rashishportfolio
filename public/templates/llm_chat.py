# llm_chat.py  ──  Universal LLM chat wrapper
# pip install openai tenacity
#
# Works with any OpenAI-compatible API: OpenAI, Groq, Together.ai, local Ollama.
# Swap base_url + model to switch providers without changing the rest of the code.

import os
from openai import OpenAI
from tenacity import retry, wait_random_exponential, stop_after_attempt

# ── Config ─────────────────────────────────────────────────────
# For Groq   → base_url="https://api.groq.com/openai/v1", model="llama3-8b-8192"
# For Ollama → base_url="http://localhost:11434/v1",      model="llama3"
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),   # or GROQ_API_KEY etc.
    # base_url="https://api.groq.com/openai/v1",  # uncomment for Groq
)

SYSTEM_PROMPT = "You are a helpful AI assistant."


# ── Chat with retry on rate limits ────────────────────────────
@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(4))
def chat(user_message: str, history: list[dict] = [], stream: bool = True):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history + [
        {"role": "user", "content": user_message}
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",          # change as needed
        messages=messages,
        stream=stream,
        temperature=0.7,
        max_tokens=1024,
    )
    if stream:
        full = ""
        for chunk in response:
            delta = chunk.choices[0].delta.content or ""
            print(delta, end="", flush=True)
            full += delta
        print()
        return full
    return response.choices[0].message.content


# ── Usage ──────────────────────────────────────────────────────
if __name__ == "__main__":
    history = []
    while True:
        user_input = input("You: ")
        if user_input.lower() in ("exit", "quit"):
            break
        reply = chat(user_input, history)
        history += [
            {"role": "user", "content": user_input},
            {"role": "assistant", "content": reply},
        ]
