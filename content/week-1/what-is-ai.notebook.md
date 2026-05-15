# Notebook Outline — What Is AI Really?

This notebook is not about training a model yet.

The goal is to understand how data becomes the starting point of AI systems.

---

## Section 1 — Setup

```python
import pandas as pd

data = {
    "app": ["YouTube", "Netflix", "Gmail", "Google Maps", "Instagram"],
    "uses_ai": [True, True, True, True, True],
    "data_used": [
        "watch history, likes, watch time",
        "watch history, ratings, searches",
        "email text, sender behavior, links",
        "location, traffic, route history",
        "likes, follows, watch time, comments"
    ],
    "prediction": [
        "which video you may watch next",
        "which movie you may enjoy",
        "whether an email is spam",
        "best route or travel time",
        "which posts you may engage with"
    ]
}
df = pd.DataFrame(data)
df

df.head()

df.info()

df["prediction"]