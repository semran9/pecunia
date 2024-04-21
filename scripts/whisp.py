import whisper
def transcribe(filename='output.wav'):
    # Load the model
    model = whisper.load_model("base")  # You can choose other models like 'base', 'medium', 'large'
    # Load and transcribe the audio file
    result = model.transcribe(filename)
    with open("data/transcript.txt", "w") as text_file:
        text_file.write(result["text"])
    return result["text"], result["language"]

if __name__ == "__main__":
    text = transcribe("data/output.wav")
    print(text)