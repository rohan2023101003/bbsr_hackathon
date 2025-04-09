from dataclasses import dataclass
from datetime import  date ,datetime
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    SmallInteger,
    String,
    Table,
    Date,
    JSON,
    Integer,
    create_engine,
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()



# Configure database connection
engine = create_engine("sqlite:///wikicontest.db")
Session = sessionmaker(bind=engine)
Base = declarative_base()


# Association table for many-to-many relationships
association_table = Table(
    "contest_jury",
    Base.metadata,
    Column("contest_id", ForeignKey("contest.id")),
    Column("judge_username", ForeignKey("user.username")),
)

# Contest model
class Contest(Base):
    __tablename__ = "contest"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(190), unique=True, nullable=False)
    description = Column(String(500),nullable=True)
    project = Column(String(200), nullable=False)
    code = Column(String(200), nullable=False)
    created_by = Column(String(100), default="user",nullable=True)
    created_on = Column(Date, default=date.today, nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)
    rules = Column(JSON, nullable=True)
    accept_points = Column(Integer, default=1)
    reject_points = Column(Integer, default=0)
    jury = relationship(
        "User", secondary=association_table, back_populates="judged_contests"
    )
    submissions = relationship("Submission", back_populates="contest")

# User model
class User(Base):
    __tablename__ = "user"

    username = Column(String(190), primary_key=True, nullable=False)
    email = Column(String(200), unique=False, nullable=True)
    # last_login = Column(DateTime, default=datetime.utcnow)

    judged_contests = relationship(
        "Contest", secondary=association_table, back_populates="jury"
    )
    submissions = relationship("Submission", back_populates="user")

# Submission model
@dataclass
class Submission(Base):
    __tablename__ = "submission"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    content = Column(String, nullable=False)
    submitted_on = Column(DateTime, default=datetime.utcnow)
    score = Column(Integer, default=0)  # Marks for the article
    # feedback = Column(String, nullable=True)  # Feedback/comments from the jury

    contest_id = Column(Integer, ForeignKey("contest.id"), nullable=False)
    user_username = Column(String(190), ForeignKey("user.username"), nullable=False)

    contest = relationship("Contest", back_populates="submissions")
    user = relationship("User", back_populates="submissions")

@dataclass
class ContestMaintainer(Base):
    __tablename__ = "contest_maintainer"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contest_id = Column(Integer, ForeignKey("contest.id"), nullable=False)
    user_username = Column(String(190), ForeignKey("user.username"), nullable=False)

    contest = relationship("Contest")
    user = relationship("User")

# ContestParticipant model
@dataclass
class ContestParticipant(Base):
    __tablename__ = "contest_participant"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contest_id = Column(Integer, ForeignKey("contest.id"), nullable=False)
    user_username = Column(String(190), ForeignKey("user.username"), nullable=False)

    contest = relationship("Contest")
    user = relationship("User")
    
    
# Create all tables
Base.metadata.create_all(engine)
