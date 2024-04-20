from meta_ai_api import MetaAI
from priv import anonymize
from translate import Translator

vars = [[]]

def llama_call(prompt):
    ai = MetaAI()
    response = ai.prompt(message = prompt)
    return response.get("message")

def get_vars():
    file = open("data/profile.txt", "r")
    content = file.read()
    vars = content.split("\n")
    return vars


def get_prompt(question):
    file = open("data/prompt.txt", "r")
    content = file.read()
    # replace var_names with variables
    vars = get_vars()
    for v in vars:
        s = v.split(":")
        info = s[1]
        tolk = "[" + s[0] + "]"
        content = content.replace(tolk, info)
    content = content + " " + question
    content = anonymize(content)
    return content

def get_response(question):
    prompt = get_prompt(question)
    response = llama_call(prompt)
    return response
 
if __name__ == "__main__":
    text = get_prompt("Hello, who are you? I'm Joe.")
    print(text)