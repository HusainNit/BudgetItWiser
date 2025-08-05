import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserGetter } from "../services/auth";
import { UserDelete } from "../services/auth";
import CircleProgress from "./ui/CircleProgress";

const ProfileData = ({ user, setUser }) => {
  let navigate = useNavigate();
  let [userdata, setUserData] = useState();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const ProfileData = async () => {
      setLoading(true);
      let payload = await UserGetter();
      if (payload) {
        setUserData(payload);
        setLoading(false);
      }
    };
    ProfileData();
  }, []);

  const DeleteUser = async () => {
    let d = await UserDelete();
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {user ? (
        userdata ? (
          <div className="profileContainer">
            <h1>Profile</h1>
            <img src="/imgs/user.png" alt="userIcon" className="userIcon" />
            <h3>Username: {userdata.username}</h3>
            <h3>Email: {userdata.email}</h3>
            <div className="button-wrapper twoButtons">
              <button
                className="AddBudgetButton"
                onClick={() => navigate("edit/")}
              >
                Edit Profile
              </button>
              <button
                className="DeleteBudgetButton"
                onClick={() => DeleteUser()}
              >
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <CircleProgress loading={loading} />
        )
      ) : (
        <div className="CantView">
          <h2>
            must <Link to="/signin">Sign In</Link> in to view this page
          </h2>
        </div>
      )}
    </>
  );
};

export default ProfileData;
