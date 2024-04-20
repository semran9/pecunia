import whisper

def transcribe(filename='output.wav'):
    # Load the model
    model = whisper.load_model("small")  # You can choose other models like 'base', 'medium', 'large'
    # Load and transcribe the audio file
    result = model.transcribe(filename)
    return result["text"]
