import whisper
import sounddevice as sd
import numpy as np
import wave

def record_audio(duration=10, filename='output.wav', samplerate=44100, channels=1):
    print("Recording...")
    myrecording = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=channels, dtype='int16')
    sd.wait()  # Wait until recording is finished
    print("Done recording.")

    # Save as WAV file
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(samplerate)
        wf.writeframes(np.asarray(myrecording).tobytes())

def transcribe_audio(filename='output.wav'):
    # Load the model
    model = whisper.load_model("small")  # You can choose other models like 'base', 'medium', 'large'

    # Load and transcribe the audio file
    result = model.transcribe(filename)
    return result["text"]

record_audio()
transcribe_audio()