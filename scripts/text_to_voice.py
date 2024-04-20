import requests
CHUNK_SIZE = 1024
url = "https://api.elevenlabs.io/v1/text-to-speech/<voice-id>"
headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": "<xi-api-key>"
}
data = {
  "text": "Born and raised in the charming south, 
  I can add a touch of sweet southern hospitality 
  to your audiobooks and podcasts",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
}




def voice(text):
    data["text"] = text
    response = requests.post(url, json=data, headers=headers)
    with open('data/response.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)
    return 


