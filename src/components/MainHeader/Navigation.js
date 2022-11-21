import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      {ctx.isLoggedIn && (
        <ul>
          <li>
            <a href="/">Users</a>
          </li>
          <li>
            <a href="/">Admin</a>
          </li>
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
