from llama import get_response
from text_to_voice import voice
# from translation import translate

from whisper import transcribe

class Assistant():
    def __init__(self, name):
        self.name = name
    def run(audio):
        question = transcribe(audio)
        response = get_response(question)
        response = voice(response)

if __name__ == "__main__":
    ast = Assitant()
    run(audio)
    

        


