import requests

CHUNK_SIZE = 4
url = "https://api.elevenlabs.io/v1/text-to-speech/VBHJi1EURb2fFADwRRjF"
headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": ""
}
data = {
  "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.36,
    "similarity_boost": 1,
    "style_exaggeration": 0.1
  }
}




def voice(text = None):
    if text != None:
        data["text"] = text
    response = requests.post(url, json=data, headers=headers)
    with open('data/response.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)


if __name__ == "__main__":
    voice()
    
