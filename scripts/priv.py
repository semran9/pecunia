# from medium, adapt for use
import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers.pipelines.token_classification import TokenClassificationPipeline

model_checkpoint = "Davlan/bert-base-multilingual-cased-ner-hrl"

tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
model = AutoModelForTokenClassification.from_pretrained(model_checkpoint)


class TokenClassificationChunkPipeline(TokenClassificationPipeline):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def preprocess(self, sentence, offset_mapping=None):
        model_inputs = self.tokenizer(
            sentence,
            return_tensors="pt",
            truncation=True,
            return_special_tokens_mask=True,
            return_offsets_mapping=True,
            return_overflowing_tokens=True,  # Return multiple chunks
            max_length=self.tokenizer.model_max_length,
            padding=True
        )
        if offset_mapping:
            model_inputs["offset_mapping"] = offset_mapping

        model_inputs["sentence"] = sentence

        return model_inputs

    def _forward(self, model_inputs):
        special_tokens_mask = model_inputs.pop("special_tokens_mask")
        offset_mapping = model_inputs.pop("offset_mapping", None)
        sentence = model_inputs.pop("sentence")
        overflow_to_sample_mapping = model_inputs.pop("overflow_to_sample_mapping")

        all_logits = torch.Tensor()
        num_chunks = len(model_inputs["input_ids"])

        # Pass one chunk at a time to the model and concatenate the results
        for i in range(num_chunks):
            model_input = {k: torch.unsqueeze(v[i], dim=0) for k, v in model_inputs.items()}
            logits = model(**model_input)[0]
            all_logits = torch.cat((all_logits, logits), dim=1)

        model_outputs = {
            "logits": all_logits,
            "special_tokens_mask": special_tokens_mask,
            "offset_mapping": offset_mapping,
            "sentence": sentence,
            "overflow_to_sample_mapping": overflow_to_sample_mapping,
            **model_inputs,
        }

        # We reshape outputs to fit with the postprocess inputs
        model_outputs["input_ids"] = torch.reshape(model_outputs["input_ids"], (1, -1))
        model_outputs["token_type_ids"] = torch.reshape(model_outputs["token_type_ids"], (1, -1))
        model_outputs["attention_mask"] = torch.reshape(model_outputs["attention_mask"], (1, -1))
        model_outputs["special_tokens_mask"] = torch.reshape(model_outputs["special_tokens_mask"], (1, -1))
        model_outputs["offset_mapping"] = torch.reshape(model_outputs["offset_mapping"], (1, -1, 2))

        return model_outputs


pipe = TokenClassificationChunkPipeline(model=model, tokenizer=tokenizer, aggregation_strategy="simple")

# Replace entities
def anonymize(text):
    ents = pipe(text)
    split_text = list(text)
    for ent in ents:
        split_text[ent['start']] = f"[{ent['entity_group']}]"
        for i in range(ent['start'] + 1, ent['end']):
            split_text[i] = ""

    return "".join(split_text)


text = "Bernard works at BNP Paribas in Paris."
anonymized_text = anonymize(text)
print(anonymized_text)