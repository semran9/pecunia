import subprocess

def play(audio_file_path):
    subprocess.call(["ffplay", "-nodisp", "-autoexit", audio_file_path])

if __name__ == "__main__":
    play("data/response.mp3")