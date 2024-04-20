from meta_ai_api import MetaAI

def llama_call(prompt):
    ai = MetaAI()
    response = ai.prompt(message = prompt)
    return response.get("message")

def get_prompt(question):
    file = open("data/prompt.txt", "r")
    content = file.read()
    return content

def get_response(question):
    prompt = get_prompt(question)
    response = llama_call(prompt)
    return response
 