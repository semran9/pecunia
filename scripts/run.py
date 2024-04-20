from llama import get_response
from text_to_voice import voice
# from translation import translate
# from translate import Translator
import time
from whisp import transcribe
import deepl

auth_key = "3b1514f5-de6c-413f-a18c-9a4392e01e18:fx"  # Replace with your key
# translator = deepl.Translator(auth_key)

class Assistant():
    def __init__(self, language):
        self.l = language
        self.auth = "3b1514f5-de6c-413f-a18c-9a4392e01e18:fx" 
        self.translator = deepl.Translator(self.auth)
    def run(self, audio):
        untranslator = None
        question, self.l = transcribe(audio)
        print(question)
        if self.l != "en":
           question = self.translator.translate_text(question, target_lang = "EN-US").text
        response = get_response(question)
        if self.l != "en":
            response = self.translator.translate_text(response, target_lang = self.l).text
        # response = voice(response)
        print(response)

if __name__ == "__main__":
    start = time.time()
    ast = Assistant("english")
    ast.run("data/sptest.mp3")
    end = time.time()
    print(start-end)


        


