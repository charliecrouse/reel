from app.db import db


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), unique=True, nullable=False)
    score = db.Column(db.Integer)
    total_votes = db.Column(db.Integer)

    def __repr__(self: 'Article') -> str:
        return '<Article title=%s total_votes=%d score=%d>' % \
            (self.title, self.total_votes, self.score)

    def get_sentiment(self: 'Article') -> float:
        mean = self.score // self.total_votes
        return mean
