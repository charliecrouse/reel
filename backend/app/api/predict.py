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

    ret = {
        'headlines': headlines,
        'sentiments': str(list(pred)),
    }

    return jsonify(ret), 200
