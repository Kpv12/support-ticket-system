import os
import requests

HF_API_KEY = os.getenv("HF_API_KEY")

API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


def classify_ticket_hf(description):

    if not HF_API_KEY:
        return None, "low"

    payload = {
        "inputs": description,
        "parameters": {
            "candidate_labels": [
                "billing",
                "account",
                "technical",
                "feature",
                "general"
            ]
        }
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)

        if response.status_code != 200:
            return None, "low"

        result = response.json()

        # Hugging Face router returns list of label-score objects
        if isinstance(result, list) and len(result) > 0:
            category = result[0]["label"]
        else:
            return None, "low"

        # Priority mapping
        if category in ["billing", "technical"]:
            priority = "high"
        elif category == "account":
            priority = "medium"
        else:
            priority = "low"

        return category, priority

    except Exception:
        return None, "low"
