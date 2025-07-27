import {Link} from "react-router-dom"

// TODO fix user and handleLogOut
const Nav =({ user, handleLogOut })=>{
   let userOptions;

  if (user) {
    userOptions = (
      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/search">Search</Link>

        <Link to="/profile">Profile</Link>

        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    );
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  );

  return (
    <header>
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="logo" />
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  );
}

export default Nav