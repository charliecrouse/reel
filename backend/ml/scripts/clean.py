"""
Clean and format the texts in the data folder for learning.

Prerequisites:
nltk.download('stopwords')
nltk.download('punkt')
"""
from pathlib import Path

import numpy as np
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


STOP_WORDS = set(stopwords.words('english'))

DATA_PATH = Path('.') / '..' / 'data'

DATA_SOURCES = [
    DATA_PATH / 'amaz' / 'amaz_neg.csv',
    DATA_PATH / 'amaz' / 'amaz_pos.csv',
    DATA_PATH / 'news' / 'news_neg.csv',
    DATA_PATH / 'news' / 'news_pos.csv',
    DATA_PATH / 'yelp' / 'yelp_neg.csv',
    DATA_PATH / 'yelp' / 'yelp_pos.csv',
]


def clean(text: str) -> str:
    # Build word tokenizations
    words = word_tokenize(text)

    # Remove non-alphabetic characters.
    words = [w for w in words if w.isalpha()]

    # Transform all words to lowercase.
    words = [w.lower() for w in words]

    # Remove all stopwords from the text.
    words = [w for w in words if w not in STOP_WORDS]

    # Join the text with spaces and return as a single string.
    return ' '.join(words)


if __name__ == '__main__':
    neg = pd.DataFrame()  # negative sentences
    pos = pd.DataFrame()  # positive sentences

    # Clean the data from each data source.
    for src in DATA_SOURCES:
        # Read in the data source as a DataFrame with Pandas.
        df = pd.read_csv(src, header=None)

        # Clean and replace each row of the data source.
        for i, row in enumerate(df.values):
            df.at[i] = clean(row[0])

        # Append the cleaned data set to the collection of negative or positive
        # data depending on its sentiment.
        if 'neg' in str(src):
            neg = pd.concat([neg, df])
        else:
            pos = pd.concat([pos, df])

        # Save the cleaned dataset to a .csv file.
        dst = str(src) + '.cleaned'
        df.to_csv(dst, header=False, index=False)

    # Save the negative and positive sentences to a .csv file
    neg.to_csv(str(DATA_PATH / 'neg.csv'), header=False, index=False)
    pos.to_csv(str(DATA_PATH / 'pos.csv'), header=False, index=False)

    # Combine the positive and negative sentences into one dataset (sentiments
    # need to be added to distinguish the positive from the negative).
    neg['sentiment'] = \
        pd.Series(np.zeros(len(neg.values), dtype=int), index=neg.index)
    pos['sentiment'] = \
        pd.Series(np.ones(len(pos.values), dtype=int), index=pos.index)
    neg_and_pos = pd.concat([neg, pos])

    # Create a new dataframe with correctly labeled headers.
    df = pd.DataFrame(data={
        'text': neg_and_pos[0],
        'sentiment': neg_and_pos['sentiment']
    })

    # Save the sentences to a .csv file.
    df.to_csv(str(DATA_PATH / 'data.csv'), index=False)
