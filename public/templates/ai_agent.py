# ai_agent.py  ──  Minimal ReAct-style tool-calling agent
# pip install openai requests
#
# Agents = LLMs that can take actions, not just generate text.
#
# How this works (ReAct loop):
#   1. You define tools as plain Python functions with type hints.
#   2. You pass their JSON schemas to the LLM via the "tools" parameter.
#   3. The LLM decides which tool to call and with what arguments.
#   4. Your code executes the function and sends the result back to the model.
#   5. Repeat until the LLM returns a final answer with no further tool calls.
#
# This is the same pattern behind ChatGPT plugins, Claude's tool use, and
# Copilot-style agents — the LLM never runs code, it only decides WHAT to run.

import os
import json
import math
import requests
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ── 1. Define tools (real Python functions) ────────────────────
def calculator(expression: str) -> str:
    """Evaluate a safe math expression. e.g. '2 ** 10 + sqrt(144)'"""
    try:
        return str(eval(expression, {"__builtins__": {}, "sqrt": math.sqrt, "pi": math.pi}))
    except Exception as e:
        return f"Error: {e}"


def web_fetch(url: str) -> str:
    """Fetch the first 500 characters of a webpage."""
    try:
        r = requests.get(url, timeout=5)
        return r.text[:500]
    except Exception as e:
        return f"Error: {e}"


TOOL_MAP = {"calculator": calculator, "web_fetch": web_fetch}

# ── 2. Tool schemas the LLM uses to decide what to call ────────
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "calculator",
            "description": "Evaluate a math expression. Use for any arithmetic.",
            "parameters": {
                "type": "object",
                "properties": {"expression": {"type": "string", "description": "Python math expression"}},
                "required": ["expression"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "web_fetch",
            "description": "Fetch raw text from a URL.",
            "parameters": {
                "type": "object",
                "properties": {"url": {"type": "string"}},
                "required": ["url"],
            },
        },
    },
]


# ── 3. Agent loop ──────────────────────────────────────────────
def run_agent(user_query: str, max_steps: int = 6) -> str:
    messages = [{"role": "user", "content": user_query}]
    for _ in range(max_steps):
        resp = client.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=TOOLS)
        msg = resp.choices[0].message
        messages.append(msg)
        if msg.tool_calls:
            for tc in msg.tool_calls:
                fn_name = tc.function.name
                args = json.loads(tc.function.arguments)
                result = TOOL_MAP[fn_name](**args)
                messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})
        else:
            return msg.content    # final answer, no more tool calls
    return "Max steps reached."


if __name__ == "__main__":
    print(run_agent("What is 2^20 minus the square root of 1764?"))
