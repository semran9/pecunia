# use bert multi-lingual-cased
# can use same model for NER most likely
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-es-en")

def translate(text):
    text = pipe(text)
    return text[0]["translation_text"]

if __name__ == "__main__":
    text = translate("Hola, yo soy Joe.")
    print(text)