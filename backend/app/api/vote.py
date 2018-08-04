from flask import Blueprint, jsonify, request

from app.util.text import clean

vote_bp = Blueprint('vote', __name__, url_prefix='/vote')


@vote_bp.route('/', methods=['POST'])
def index():
    # If there is no JSON payload in the request, respond with a 400 error.
    if not request.is_json:
        return jsonify({'message': 'missing JSON in request'}), 400

    # Extract the `headline` from the request (will be set to `None` if there
    # is no `headline` field present in the request).
    headline: str = request.json.get('headline', None)

    # If the request contains no field called `headline`, then respond with a
    # 400 error.
    if headline is None:
        return jsonify({'message': 'missing headline in request'}), 400

    # If the request contains a `headline` field, but the value is not a
    # string, respond with a 400 error.
    if not isinstance(headline, str):
        return jsonify({'message': 'headline must be a string'}), 400

    # Extract the `sentiment` from the request (will be set to `None` if there
    # is no `sentiment` field present in the request).
    sentiment: int = request.json.get('sentiment', None)

    # If the request contains no field called `sentiment`, then respond with a
    # 400 error.
    if sentiment is None:
        return jsonify({'message': 'missing sentiment in request'}), 400

    # If the request contains a `sentiment` field, but the value is not a
    # number (-1, 0, or 1), respond with a 400 error.
    if not isinstance(sentiment, int) or sentiment < -1 or sentiment > 1:
        return jsonify({'message': 'sentiment must be -1, 0, or 1'})

    # Clean the headline text.
    cleaned: str = clean(headline)

    # Construct the response payload.
    ret = {
        'original': headline,
        'cleaned': cleaned,
        'sentiment': sentiment
    }

    return jsonify(ret), 200
