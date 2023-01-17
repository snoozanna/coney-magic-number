import { Routes, Route } from "react-router-dom";
import Home from "./../Home/index.js";
import Form from "../../components/Form/index.js";
import Results from "../Results/index.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/form" element={<Form />} exact />
        <Route path="/results" element={<Results />} exact />
      </Routes>
    </div>
  );
}
export default App;
