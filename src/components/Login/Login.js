import React, { useState, useEffect, useReducer } from "react";
import classes from "./Login.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredemail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsvalid] = useState();
  const [enteredpassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        enteredemail.includes("@") && enteredpassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [enteredemail, enteredpassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredemail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsvalid(enteredemail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredpassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredemail, enteredpassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={enteredemail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={enteredpassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
