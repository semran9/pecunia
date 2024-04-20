import whisper

def transcribe(filename='output.wav'):
    # Load the model
    model = whisper.load_model("tiny")  # You can choose other models like 'base', 'medium', 'large'
    # Load and transcribe the audio file
    result = model.transcribe(filename)
    return result["text"]

if __name__ == "__main__":
    text = transcribe("data/output.mp3")
    print(text)