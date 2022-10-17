import { Routes, Route, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Layout from "./components/layout/Layout";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    
    <div className="App">
      
      <Layout>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AdminPage/:username" element={<AdminPage />} />
      <Route path="games/:id" element={<GameDetails />} />
      <Route path="/SingUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/User/:username" element={<UserProfile />} />
      </Routes>
      </Layout>
      
    </div>
    
  );
}

export default App;
