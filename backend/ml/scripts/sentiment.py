import pickle as pkl
from pathlib import Path

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC


# Path of the data to use for learning.
data_path = Path('.') / '..' / 'data' / 'data.csv'

# Read in the data.
df = pd.read_csv(data_path, )

# Extract the data and labels.
X = df['text']
X = X.astype(str)
y = df['sentiment']

# Create a pipeline for the classifier.
pipeline = Pipeline([
    ('vect', CountVectorizer()),
    ('tfidf', TfidfTransformer()),
    ('clf', LinearSVC())
])

# Define the parameters to search over during grid-search.
params = {
    'vect__ngram_range': [(1, 1), (1, 2), (1, 3)],
    'tfidf__norm': ['l1', 'l2'],
    'tfidf__use_idf': [True, False],
    'clf__tol': [1e-2, 1e-3, 1e-4, 1e-6]
}

# Search over the defined model space and choose the model with the best
# performance.
gs = GridSearchCV(
    pipeline,
    params,
    n_jobs=-1
)

# Perform cross-validation to see how the model performs on different sub-sets
# of the training data.
score = cross_val_score(gs, X, y)
print("Cross Validation Score", score)

# Fit the model to the full dataset.
clf = gs.fit(X, y)

# Persist the model to a file.
output = open(Path('..') / 'clf.pkl', 'wb')
pkl.dump(clf, output, -1)
output.close()
