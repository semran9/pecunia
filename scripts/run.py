from llama import get_response
from text_to_voice import voice
from translation import translate
import time
from whisp import transcribe

class Assistant():
    def __init__(self, language):
        self.l = language
    def run(self, audio):
        question, self.l = transcribe(audio)
        if self.l != "en":
           question = translate(question)
        response = get_response(question)
        response = voice(response)
        print(response)

if __name__ == "__main__":
    start = time.time()
    ast = Assistant("english")
    ast.run("data/test.mp3")
    end = time.time()
    print(start-end)


        


