import pandas as pd
from flask import Blueprint, jsonify, request

from app.ml import clf


predict_blueprint = Blueprint('predict', __name__, url_prefix='/predict')


@predict_blueprint.route('/', methods=['POST'])
def index():
    # If there is no JSON payload in the request, respond with a 400 error.
    if not request.is_json:
        return jsonify({'message': 'missing JSON in request'}), 400

    # Extract the `headlines` from the request (will be set to `None` if there
    # is no headlines field present in the request).
    headlines = request.json.get('headlines', None)

    # If the request contains no `headlines`` field, then respond with a 400
    # error.
    if headlines is None:
        return jsonify({'message': 'missing headlines in request'}), 400

    # If the request contains a `headlines` field, but the value is not a list
    # of strings, then respond with a 400 error.
    if not isinstance(headlines, list) or not isinstance(headlines[0], str):
        return jsonify({'message': 'headlines must be a list of strings'}), 400

    # If the request contains a `headlines` field, but the value is empty,
    # respond with a 400 error.
    if len(headlines) == 0:
        return jsonify({'message': 'headlines must not be empty'}), 400

    # Predict the sentiments of the headlines from the request.
    pred = clf.predict(headlines)

    # Format the predictions in order to serialize them to json.
    df = pd.DataFrame(list(pred))

    # Construct the payload to send in the response.
    ret = {
        'headlines': headlines,
        'sentiments': df.to_json(orient="records"),
    }

    # Respond with the payload as JSON with a status of 200.
    return jsonify(ret), 200
