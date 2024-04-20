from meta_ai_api import MetaAI

ai = MetaAI()
def llama_call(prompt):
    response = ai.prompt(message = prompt)
    return response.get("message")


 