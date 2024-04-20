from llama import get_response
from text_to_voice import voice
# from translation import translate
from translate import Translator
import time
from whisp import transcribe

class Assistant():
    def __init__(self, language):
        self.l = language
    def run(self, audio):
        untranslator = None
        question, self.l = transcribe(audio)
        self.l = "spanish"
        if self.l != "en":
           translator = Translator(from_lang = self.l, to_lang="English")
           untranslator = Translator(from_lang = "English", to_lang=self.l)
           question = translator.translate(question)
        response = get_response(question)
        if untranslator != None:
            response = untranslator.translate(response)
        # response = voice(response)
        print(response)

if __name__ == "__main__":
    start = time.time()
    ast = Assistant("english")
    ast.run("data/sptest.mp3")
    end = time.time()
    print(start-end)


        


