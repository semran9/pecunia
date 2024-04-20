from llama import get_response
from text_to_voice import voice
from translation import translate

from whisp import transcribe

class Assistant():
    def __init__(self, language):
        self.l = language
    def run(self, audio):
        question = transcribe(audio)
        if self.l == "spanish":
           question = translate(question)
        response = get_response(question)
        # response = voice(response)
        print(response)

if __name__ == "__main__":

    ast = Assistant("english")
    ast.run("data/output.mp3")


        


