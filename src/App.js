import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
 

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Start />}></Route>

          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;