import "../css/App/App.css";
import "../css/Nav/Nav.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import SingIn from "./pages/SignIn";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SingIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
