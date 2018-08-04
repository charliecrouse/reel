import pickle as pkl
from pathlib import Path

# Open the file containing the pickeled classifier for reading.
input = open(Path('.') / 'app' / 'clf.pkl', 'rb')

# De-pickle the classifier.
clf = pkl.load(input)

# Close the input stream.
input.close()
