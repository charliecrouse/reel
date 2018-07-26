import pandas as pd
from flask import Blueprint, jsonify, request
from sklearn.externals import joblib

clf = joblib.load('ml/clf.pkl')

predict_bp = Blueprint('predict', __name__, url_prefix='/predict')


@predict_bp.route('/', methods=['POST'])
def index():
    if not request.is_json:
        return jsonify({'message': 'missing JSON in request'}), 400

    headlines = request.json.get('headlines', None)

    if headlines is None:
        return jsonify({'message': 'missing headlines in request'}), 400

    pred = clf.predict(headlines)

    # Format the predictions in order to serialize to json.
    df = pd.DataFrame(list(pred))

    ret = {
        'headlines': headlines,
        'sentiments': df.to_json(orient="records"),
    }

    return jsonify(ret), 200
