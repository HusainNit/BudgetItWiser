import "../css/pages/app.css";
import "../css/components/nav.css";
import "../css/pages/signin-&-register.css";
import "../css/pages/budget.css";
import "../css/components/newBudget.css";
import "../css/components/editBudget.css";
import "../css/pages/expense.css";
import "../css/components/newExpense.css";
import "../css/components/editExpense.css";
import "../css/pages/profile.css";
import "../css/components/editProfile.css";
import "../css/pages/analytic.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect, use } from "react";

import Nav from "./components/Nav.jsx";
import SingIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Budget from "./pages/Budget.jsx";
import Expense from "./pages/Expenses.jsx";
import Profile from "./pages/Profile.jsx";
import Analytic from "./pages/Analytic.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };
  // TODO make check more of the backend check
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SingIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/budgets/*" element={<Budget user={user} />} />
          <Route
            path="/budgets/:id/expenses/*"
            element={<Expense user={user} />}
          />
          <Route
            path="/profile/*"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="/analytic/" element={<Analytic user={user} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
