from flask import Flask, jsonify

from app.api.predict import predict_bp


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    register_blueprints(app)

    @app.route('/ping')
    def ping():
        return jsonify('Hello, World!')

    return app


def register_blueprints(app):
    app.register_blueprint(predict_bp)
