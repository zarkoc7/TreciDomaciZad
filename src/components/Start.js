import React from "react";
import { Link } from "react-router-dom";

function Start(props) {
  return (
    <div className="start--flex">
      <h1>Quizzcal</h1>
      <p>My first React project</p>
      <Link to="/quiz">Start quiz</Link>
    </div>
  );
}

export default Start;