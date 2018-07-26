# REEL

News application that performs sentiment analysis on articles to determine the tone.

## Getting Started

### Dependencies

* [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/)
* [Python3](https://www.python.org/download/releases/3.0/) with [pipenv](https://docs.pipenv.org/)
* API Key from the [News API](https://newsapi.org/)

### Clone the repository

```sh
git clone git@github.com:charliecrouse/reel.git
cd reel
```

### Environment Variables

```sh
# BE SURE TO REPLACE <YOUR_API_KEY_HERE> with your API key from News API
cp example.env .env
```

### Installing

Frontend:
```sh
yarn install  # or npm install
```

Backend:
```sh
cd backend
pipenv install
```

## Running the Application

First, the backend:
```sh
cd backend

# Set necessary environment variables.
export FLASK_ENV=development
export FLASK_APP=app

# Run with flask cli.
flask run
```

Now, the frontend (make sure you are in the root directory):
```sh
yarn run start
```

Visit http://localhost:3000 to see the application running on your machine.
