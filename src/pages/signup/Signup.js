import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils";
export const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [batch, setBatch] = useState(2000);
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [district, setDistrict] = useState("bhopalpally");
  const district_options = [
    "jodhpur",
    "sikar",
    "bhopalpally"
  ];
  const navigate = useNavigate();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("mobile", mobile);
    formData.append("dob", dob);
    formData.append("batch", batch);
    formData.append("district", district);
    // console.log("Hemang")
    for(var pair1 of formData.entries()) {
      console.log(pair1[0] + " : " + pair1[1]);
    }
    try {
      const response = await fetch(getBaseUrl() + "user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data);
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="bg1"
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0px",
        padding: "0px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(/BackgroundLogin.jpg)",
      }}
    >
      <img className={styles.img1} src="/img1.png" alt="" />
      <img className={styles.img2} src="/img2.png" alt="" />

      <div className={styles.mainDiv}>
        <div className={styles.mainDivHeader}>
          <img className={styles.nirnayaImg} src="/Nirnaya.png" alt="" />
          <span className={styles.headingSpan}>Decision Support System</span>
        </div>
        <Form onSubmit={handleSubmit} className="form-signup">
          <div className={`row ${styles.signupFormDiv}`}>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="first_name">
                <Form.Label>
                  First Name<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="last_name">
                <Form.Label>
                  Last Name<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="username">
                <Form.Label>
                  Username<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="password">
                <Form.Label>
                  Password<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="batch">
                <Form.Label>
                  Batch Year<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="number"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="mobileNumber">
                <Form.Label>
                  Mobile Number<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="dob">
                <Form.Label>
                  Date Of Birth<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="email">
                <Form.Label>
                  Email<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-sm-6">
              <Form.Group style={{ marginTop: "10px" }} controlId="district">
                <Form.Label>
                  District<span style={{ color: "red" }}>*</span>
                 </Form.Label>
                <Form.Select
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                >
                  {district_options.map((item) => {
                    return (
                      <option value={item}>
                        {capitalizeFirstLetter(item)}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-sm-6"></div>
          </div>
          <div className={styles.signUpButtonDiv}>
            <button type="submit" className={`btn btn-primary ${styles.signUpButton}`}>
              Signup
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
