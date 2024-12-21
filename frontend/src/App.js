import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewEditathon from "./pages/NewEditathon";
import JuryReview from "./pages/JuryReview";
import ParticipantView from "./pages/ParticipantView";
import ContestDetail from "./pages/ContestDetail";
import EditContest from "./pages/EditContest"; 
import SubmitArticle from "./pages/SubmitArticle";

const App = () => {
  const userRole = "coordinator"; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-editathon" element={<NewEditathon />} />
        <Route path="/jury-review" element={<JuryReview />} />
        <Route path="/participant" element={<ParticipantView />} />
        <Route path="/submit-article/:contestId" element={<SubmitArticle />} />
        
        
        <Route
          path="/contest/:contestId"
          element={<ContestDetail userRole={userRole} />}
        />
        
        
        <Route path="/edit-contest/:contestId" element={<EditContest />} />

        
        <Route path="/submit-article/:contestId" element={<SubmitArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
