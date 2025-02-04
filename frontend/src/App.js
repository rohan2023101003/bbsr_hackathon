import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewEditathon from "./pages/NewEditathon";
import JuryReview from "./pages/JuryReview";
import ParticipantView from "./pages/ParticipantView";
import ContestDetail from "./pages/ContestDetail";
import EditContest from "./pages/EditContest"; 
import SubmitArticle from "./pages/SubmitArticle";
import { fetchUser } from "./api/user";
import { fetchContest } from "./api/contest";
import ParticipantDashboard from "./pages/ParticipantDashboard";

const App = () => {
  const userRole = "coordinator"; 

  console.log( fetchUser() );
  console.log( fetchContest() );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard  userRole={userRole}/>} />
        <Route path="/new-editathon" element={<NewEditathon />} />
        <Route path="/jury-review/:contestId" element={<JuryReview />} />
        <Route path="/participant" element={<ParticipantView />} />
        <Route path="/submit-article/:contestId" element={<SubmitArticle />} />
        <Route path="/participant-dashboard/:username" element={<ParticipantDashboard />} />

        
        
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
