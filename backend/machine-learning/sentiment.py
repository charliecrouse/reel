import pandas as pd

from sklearn.externals import joblib
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer

# Read in the data.
train_df = pd.read_csv('./data/train.csv')
test_df = pd.read_csv('./data/train.csv')

# Extract the text and sentiments from the training data.
X_train = train_df['text']
X_train = X_train.astype(str)
y_train = train_df['sentiment']

# Extract the text and sentiments from the test data.
X_test = test_df['text']
X_test = X_test.astype(str)
y_test = test_df['sentiment']

# Create a pipline to use during the gridsearch.
pipeline = Pipeline([
    ('vect', CountVectorizer()),
    ('tfidf', TfidfTransformer()),
    ('clf', LinearSVC())
])

# Define the parameters to search over.
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
score = cross_val_score(gs, X_train, y_train)
print("Cross Validation Score", score)

# Fit the chosen classifier to the training data and determine how it performs
# on the testing data.
gs.fit(X_train, y_train)
print("Validation Score", gs.score(X_test, y_test))

# Persist the model into the file `model.pkl`.
joblib.dump(gs, 'clf.pkl')

# The model can now be loaded by using joblib.
# gs = joblib.load('clf.pkl')
