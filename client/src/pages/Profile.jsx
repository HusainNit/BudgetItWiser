import { Routes, Route } from "react-router-dom";

import ProfileData from "../components/ProfileData";
import ProfileEdit from "../components/ProfileEdit";

const Profile = ({ user, setUser }) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProfileData user={user} setUser={setUser} />}
        />
        <Route path="edit/" element={<ProfileEdit user={user} />} />
      </Routes>
    </>
  );
};

export default Profile;
