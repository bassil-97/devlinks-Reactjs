import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import Preview from "./pages/Preview/Preview";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/preview/:userId" element={<Preview />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
