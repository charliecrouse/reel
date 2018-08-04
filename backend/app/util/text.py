from nltk.corpus import stop_words
from nltk.tokenize import word_tokenize


def clean(text: str) -> str:
    # Build word tokenizations
    words = word_tokenize(text)

    # Remove non-alphabetic characters.
    words = [w for w in words if w.isalpha()]

    # Transform all words to lowercase.
    words = [w.lower() for w in words]

    # Remove all stopwords from the text.
    words = [w for w in words if w not in stop_words]

    # Join the text with spaces and return as a single string.
    return ' '.join(words)
