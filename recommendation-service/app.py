from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np


app = FastAPI()
# Allow frontend origin
origins = [
    "http://localhost:5173",  # your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# LOAD  DATA
# ==============================

popular_df = pickle.load(open("data/popular.pkl", "rb"))
pt = pickle.load(open("model/pt.pkl", "rb"))
books = pickle.load(open("model/books.pkl", "rb"))
similarity_scores = pickle.load(open("model/similarity_scores.pkl", "rb"))

# ==============================
# 1. POPULAR BOOK FUNCTION
# ==============================

def get_popular_books():
    try:
        return popular_df.to_dict(orient="records")
    except:
        return []


# ==============================
# 2. RECOMMENDED BOOK FUNCTION
# ==============================

def recommend(book_name):
    try:
        # Case-insensitive match
        matches = [title for title in pt.index if title.lower() == book_name.lower()]
        if not matches:
            return []

        index = np.where(pt.index == matches[0])[0][0]

        similar_items = sorted(
            list(enumerate(similarity_scores[index])),
            key=lambda x: x[1],
            reverse=True
        )[1:6]

        data = []

        for i in similar_items:
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]

            temp_df = temp_df.drop_duplicates('Book-Title')

            book_info = {
                "title": temp_df['Book-Title'].values[0],
                "author": temp_df['Book-Author'].values[0],
                "image": temp_df['Image-URL-M'].values[0]
            }

            data.append(book_info)

        return data

    except:
        return []

# ==============================
# ROUTES
# ==============================

@app.get("/")
def home():
    return {"message": "Popularity Recommendation API running "}


@app.get("/popular")
def popular_books():
    return {
        "recommendations": get_popular_books()
    }

@app.get("/recommend/{book_name}")
def get_recommendations(book_name: str):
    recs = recommend(book_name)

    if not recs:
        return {
            "message": "Book not found",
            "recommendations": []
        }

    return {"recommendations": recs}