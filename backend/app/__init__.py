import os
import sys

from dotenv import load_dotenv as dotenv
from flask import Flask
from pathlib import Path


def create_app() -> Flask:
    # Initialize the Flask application.
    app = Flask(__name__)

    # Enable non-strict url paths for url paths (e.g. /url/path/ == /url/path)
    app.url_map.strict_slashes = False

    # Load in environment variables defined in .env files.
    load_dotenv()

    # Connect the application to the main database.
    connect_database(app)

    # Enable all other application routes.
    register_blueprints(app)

    return app


def load_dotenv() -> None:
    # Determine the mode the application is running in (development, test, or
    # production).
    env = os.getenv('FLASK_ENV')

    # Construct the path of the .env file using the current execution mode of
    # the server.
    path = Path('.') / ('%s.env' % env)

    # Load in the environment variables from the .env file at the constructed
    # path.
    dotenv(dotenv_path=path)


def connect_database(app: Flask, verbose: bool = True) -> None:
    from app.db import db

    # Disable modification tracking due to the significant added overhead.
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Attempt to read the database URI from an environment variable and fail
    # (loudly if verbose is True) if the environment variable is not set.
    try:
        app.config['SQLALCHEMY_DATABASE_URI'] = \
            os.getenv('SQLALCHEMY_DATABASE_URI')
    except KeyError:
        verbose and sys.stderr.write('Could not connect to database.\n')
        exit(1)

    # Connect the database to the Flask application.
    db.init_app(app)

    # Initialize all database tables derived from the application's models.
    # db.create_all()

    # Display the established connection to the database.
    verbose and sys.stdout.write('Connected to ' +
                                 app.config['SQLALCHEMY_DATABASE_URI'])


def register_blueprints(app: Flask) -> None:
    # If the application is running in development mode, then register a route
    # to check health of the server.
    if os.getenv('FLASK_ENV') == 'development':
        @app.route('/ping')
        def ping():
            return 'Hello, World!'

    from app.api.predict import predict_blueprint

    # Register all application blueprints (modules containing the route
    # handlers).
    app.register_blueprint(predict_blueprint)
