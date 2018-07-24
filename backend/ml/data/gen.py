import numpy as np
import pandas as pd

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

from sklearn.model_selection import train_test_split


# run these downloads in order to run the preprocessing script
# import nltk
# nltk.download('stopwords')
# nltk.download('punkt')

stop_words = set(stopwords.words('english'))


def preprocess(headline):
    # build tokenizations
    words = word_tokenize(headline)

    # remove non-alpha chars
    words = [w for w in words if w.isalpha()]

    # transform all words to lowercase
    words = [w.lower() for w in words]

    # remove stop words
    words = [w for w in words if w not in stop_words]

    return ' '.join(words)


if __name__ == '__main__':
    sources = {
        # Amazon data
        'amaz/amaz_neg.orig.csv': 'amaz/amaz_neg.csv',
        'amaz/amaz_pos.orig.csv': 'amaz/amaz_pos.csv',
        # News data
        'news/news_neg.orig.csv': 'news/news_neg.csv',
        'news/news_pos.orig.csv': 'news/news_pos.csv',
        # Yelp data
        'yelp/yelp_neg.orig.csv': 'yelp/yelp_neg.csv',
        'yelp/yelp_pos.orig.csv': 'yelp/yelp_pos.csv',
    }

    pos = pd.DataFrame()
    neg = pd.DataFrame()

    for src, dst in sources.items():
        df = pd.read_csv(src, header=None)

        for i, row in enumerate(df.values):
            x = preprocess(row[0])
            df.at[i] = x

        if 'neg' in src:
            neg = pd.concat([neg, df])
        else:
            pos = pd.concat([pos, df])

        df.to_csv(dst, header=False, index=False)

    neg.to_csv('neg.csv', header=False, index=False)
    pos.to_csv('pos.csv', header=False, index=False)

    neg['sentiment'] = pd.Series(
        np.zeros(len(neg.values), dtype=int), index=neg.index)
    pos['sentiment'] = pd.Series(
        np.ones(len(pos.values), dtype=int), index=pos.index)

    df = pd.concat([pos, neg])

    X = df[0]
    y = df['sentiment']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42)

    train_df = pd.DataFrame(data={'text': X_train, 'sentiment': y_train})
    train_df.dropna(how='all')
    train_df.to_csv('train.csv', index=False)

    test_df = pd.DataFrame(data={'text': X_test, 'sentiment': y_test})
    test_df.dropna(how='all')
    test_df.to_csv('test.csv', index=False)
