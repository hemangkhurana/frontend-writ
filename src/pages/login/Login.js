import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils";
import Form from "react-bootstrap/Form";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    // console.log("hereeeeeeeeeeeeeeeeeeeee");
    try {
      const response = await fetch(getBaseUrl() + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();
      // console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/user/wp");
      } else {
        alert(data.error);
        setLoginError(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div>
    <div
      className={styles.bg1}
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0px",
        padding: "0px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(/BackgroundLogin.jpg)",
      }}
    >
      {/* <img src="/BackgroundLogin.jpg" className={styles.backgroundLogin} alt=""/> */}
      <img src="/img1.png" className={styles.img1} alt="" />
      <img src="/img2.png" className={styles.img2} alt="" />

      <div className={styles.mainDiv}>
        <div className={styles.mainDivHeader}>
          <img className={styles.nirnayaImg} src="/Nirnaya.png" alt="" />
          <span className={styles.headingSpan}>Decision Support System</span>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.loginFormDiv}>
            <label>
              <p className={styles.loginUsername}>Username</p>
              <Form.Control className={styles.loginUsernameForm}
                placeholder="username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={username}
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              <p className={styles.loginPassword}>Password</p>
              <Form.Control className={styles.loginPasswordForm}
                placeholder="password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <p>{loginError}</p>
          <div>
            <span>Forgot Password?</span>
            {/* <span>Remember Me <input type="checkbox"/></span> */}
          </div>
          <button className={`btn btn-primary ${styles.loginButton}`} type="submit">
            Login
          </button>
        </form>
        <p className={styles.signUpText}>
          Don't Have and Account Already?
        </p>
        <p>
          <Link to="/signup">
            <button className={`btn-primary btn ${styles.signUpButton}`}>
              Signup
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};
