import React, { useState, useContext, useMemo } from "react";
import { Button, Input, Typography, Link } from "@mui/material";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogin() {
    if (email == "") {
      alert("Enter email address");
      return;
    }
    if (password == "") {
      alert("Enter password");
      return;
    }
    var myHeaders = new Headers();
    var raw = JSON.stringify({
      email: email,
      password: password,
    });
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          alert("You have successfully logged in");
          localStorage.setItem("token", result.token);
          localStorage.setItem("data", JSON.stringify(result.data));
          setUser(result.data);
          return;
        }
        return alert("The password or email is incorrect")
        //navigate("/internal-error");
      })
      .catch((error) => {
        navigate("/internal-error");
      });
  }
  return (
    <div className="login">
      <div className="center login-content">
        <div>
          <LockTwoToneIcon color="secondary" fontSize="large" />
        </div>
        <h1>Login</h1>
        <div className="input-text">
          <Input
            color="secondary"
            type="text"
            id="email"
            onChange={() => setEmail(document.getElementById("email").value)}
            value={email}
            placeholder="Email"
            fullWidth
          />
        </div>
        <div className="input-text">
          <Input
            color="secondary"
            fullWidth
            type="password"
            id="password"
            onChange={() =>
              setPassword(document.getElementById("password").value)
            }
            value={password}
            placeholder="Password"
          />
        </div>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          <LoginOutlinedIcon />
          Login
        </Button>
        <Typography>
          Do not have an account?{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "red",
            }}
            onClick={() => navigate("/sign-up")}
          >
            Sign up here
          </span>
        </Typography>
      </div>
    </div>
  );
};
export default Login;
