import { Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/layout/Layout";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Layout>
      <Routes>
      <Route path="/SingUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
