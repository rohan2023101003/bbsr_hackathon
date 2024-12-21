from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime ,date 
# Import the models from your models file
from flask_migrate import Migrate
from models import Contest, User, ContestMaintainer, ContestParticipant ,Submission , Session , association_table
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Correct database URI with the absolute path
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////home/rohan/wiki_bbsr/wikicontest/wikicontest.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)

CORS(app, origins="*", supports_credentials=True)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask"})

with app.app_context():
    db.create_all()

# Route to create a new contest
@app.route("/new-editathon", methods=["POST"])
def create_contest():
    try:
        # Get JSON data from the request
        # session = Session()
        data = request.get_json()

        # Validate the required fields
        if not data.get('name') or not data.get('description') or not data.get('start_date') or not data.get('end_date') or not data.get('created_by'):
            return jsonify({"error": "Missing required fields"}), 400

        # Parse dates from the request
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        # Fetch judge objects based on provided usernames
        judges = []
        if 'judges' in data:
            for judge_username in data['judges']:
                judge = db.session.query(User).filter_by(username=judge_username).first()
                if judge:
                    judges.append(judge)
                else:
                    return jsonify({"error": f"Judge '{judge_username}' not found."}), 404
        rules = data.get('rules', {})
        accept_points = data.get('accept_points', 1)
        reject_points = data.get('reject_points', 0)
        # Create new contest object
        new_contest = Contest(
            name=data['name'],
            description=data['description'],
            project=data['project'],
            code=data['code'],
            start_date=start_date,
            end_date=end_date,
            created_on=datetime.today(),
            judges=judges,
            created_by=data['created_by'],
            rules=rules,
            accept_points=accept_points,
            reject_points=reject_points,
        )

        # Add to the session and commit
        db.session.add(new_contest)
        db.session.commit()

        # Return a success response
        return jsonify({
            "message": "Contest created successfully",
            "contest_id": new_contest.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@app.route("/user-details", methods=["POST"])
def add_user():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Validate the required fields
        if not data.get('username') or not data.get('email'):
            return jsonify({"error": "Missing required fields"}), 400

        # Create new contest object
        new_user = User(
            username=data['username'],
            email=data['email'],
        )

        # Add to the session and commit
        db.session.add(new_user)
        db.session.commit()

        # Return a success response
        return jsonify({
            "message": "user added successfully",
            "username": new_user.username
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



# Route to get all contests (optional for listing contests)
@app.route("/contests", methods=["GET"])
def get_contests():
    # Create a session to interact with the database
    session = Session()

    # Query the database using the session
    contests = session.query(Contest).all()

    # Process the contests to extract necessary data
    contests_data = [
        {"name": contest.name, "start_date": contest.start_date, "end_date": contest.end_date , "judges": [judge.username for judge in contest.judges]}
        for contest in contests
    ]

    # Close the session after use
    session.close()

    return jsonify(contests_data), 200
#route fora user dashboard
@app.route("/user/<string:username>", methods=["GET"])
def get_user(username):
    try:
        # Fetch the user from the database by username
        user = db.session.query(User).get(username)

        # Prepare user details
        user_data = {
            "username": user.username,
            "email": user.email,
            "judged_contests": [contest.name for contest in user.judged_contests],
            # "submissions": [submission.title for submission in user.submissions],
            #group the submission by contest wise and then show
            "submissions": [
                {
                    "contest_id": submission.contest_id,
                    "title": submission.title,
                    "content": submission.content,
                    "submitted_on": submission.submitted_on.isoformat(),
                }
                for submission in user.submissions
            ]
        }
        # also give partipated contests and submissions made in each contest
        # Fetch the number of submissions by each user in the contest (grouped by user)
       
        
        # Return user details as JSON
        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get a contest by its ID
@app.route("/contest/<int:contest_id>/submit", methods=["POST"])
def submit_contest(contest_id):
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Validate the required fields
        if not data.get('user_username') or not data.get('title') or not data.get('content'):
            return jsonify({"error": "Missing required fields"}), 400
        #send contest as object instead of id
        # Fetch the contest from the database by ID
        contest = db.session.query(Contest).get(contest_id)
        if not contest:
            return jsonify({"error": "Contest not found"} ), 404
        
        # Create new submission object
        new_submission = Submission(
            user_username=data['user_username'],
            title=data['title'],
            content=data['content'],
            submitted_on=datetime.today(),
            contest_id=contest.id,
        )

        # Add to the session and commit
        db.session.add(new_submission)
        db.session.commit()

        # Return a success response
        return jsonify({
            "message": "Submission added successfully",
            "submission_id": new_submission.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/contest/<int:contest_id>", methods=["GET"])
def get_contest(contest_id):
    try:
        # Fetch the contest from the database by ID
        session = Session()
        contest = session.query(Contest).get(contest_id)
                # Validate judges
  
        # Prepare contest details
        contest_data = {
            "id": contest.id,
            "name": contest.name,
            "description": contest.description,
            "created_by": contest.created_by,
            "created_on": contest.created_on.isoformat(),
            "start_date": contest.start_date.isoformat(),
            "end_date": contest.end_date.isoformat(),
            "is_active": contest.is_active,
            "judges": [
                {
                    "username": judge.username,
                    "email": judge.email,
    
                } for judge in contest.judges
            ],
             
        }
        # Fetch the number of submissions by each user in the contest (grouped by user)
        submissions = db.session.query(
            Submission.user_username,
            db.func.count(Submission.id).label('submission_count')
        ).filter(Submission.contest_id == contest_id) \
         .group_by(Submission.user_username) \
         .all()

        # Prepare submissions data with user-wise count
        submissions_data = [
            {
                "user_username": submission.user_username, 
                "submission_count": submission.submission_count,
                "titles": [sub.title for sub in session.query(Submission.title)
                        .filter(Submission.user_username == submission.user_username)
                        .filter(Submission.contest_id == contest_id)
                        # .distinct()  # Ensures only distinct titles
                        # .limit(submission.submission_count)  # Limits the titles to the submission count
                        .all()]
            }
            for submission in submissions
        ]
        contest_data["submissions"] = submissions_data
        
        session.close()
        # Return contest details as JSON
        return jsonify(contest_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to update a contest by its ID

# @app.route("/contest/<int:contest_id>", methods=["PUT"])
# def update_contest(contest_id):
#     try:
#         # Fetch the contest from the database by ID
#         contest = Contest.query.get_or_404(contest_id)

#         # Get JSON data from the request
#         data = request.get_json()

#         # Update the contest fields if provided in the request
#         if data.get('name'):
#             contest.name = data['name']
#         if data.get('description'):
#             contest.description = data['description']
#         if data.get('project'):
#             contest.project = data['project']
#         if data.get('code'):
#             contest.code = data['code']
#         if data.get('start_date'):
#             contest.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
#         if data.get('end_date'):
#             contest.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
#         if data.get('is_active'):
#             contest.is_active = data['is_active']

#         # Commit the changes to the database
#         db.session.commit()

#         # Return a success response
#         return jsonify({"message": "Contest updated successfully"}), 200

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
