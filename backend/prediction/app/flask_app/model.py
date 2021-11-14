# from transformers import BertForMaskedLM, BertTokenizer

from pyaspeller import YandexSpeller
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


query_popularity = pd.read_csv('./popular_to_bert.csv')
speller = YandexSpeller()

corpus = list(query_popularity['query'])
vectorizer = CountVectorizer(lowercase = False)
X = vectorizer.fit_transform(corpus)
X.dtype = np.float32

def determ_rec(sent, vectorizer, df, N_rec = 10):
   X1 = vectorizer.transform([sent])
   idx = cosine_similarity(X1, X)[0].argsort()[-N_rec:]
   recom = list(df['query'][idx])
   recom = [string.lower() for string in recom]
   return recom


def predict(text):
    text = speller.spelled(text)
    results = determ_rec(text,vectorizer,query_popularity)
    return results