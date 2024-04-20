from meta_ai_api import MetaAI
from priv import anonymize

vars = [[]]

def llama_call(prompt):
    ai = MetaAI()
    response = ai.prompt(message = prompt)
    return response.get("message")

def get_prompt(question):
    file = open("data/prompt.txt", "r")
    content = file.read()
    # replace var_names with variables
    #for v in vars:
    #    content = content.replace(v[0], v[1])
    content = content + " " + question
    content = anonymize(content)
    return content

def get_response(question):
    prompt = get_prompt(question)
    response = llama_call(prompt)
    return response
 
if __name__ == "__main__":
    text = get_response("Hello, who are you? I'm Joe.")
    print(text)