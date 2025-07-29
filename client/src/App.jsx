import "../css/pages/app.css";
import "../css/components/nav.css";
import "../css/pages/signin-&-register.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav.jsx";
import SingIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";

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
