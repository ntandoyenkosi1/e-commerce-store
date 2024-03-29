import { useState } from "react";
import { Button, Input, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function handleSignUp() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (name == null) {
      return;
    }
    if (email == null) {
      return;
    }

    if (password == null) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/users/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          alert("You have signed up successfully");
          navigate("/login");
          return;
        }
        navigate("/internal-error");
      })
      .catch((error) => {
        navigate("/internal-error");
      });
  }
  return (
    <div className="signup">
      <div className="center">
        <div>
          <AccountCircleRoundedIcon color="secondary" fontSize="large" />
        </div>
        <h1>Sign Up</h1>
        <div className="input-text">
          <Input
            color="secondary"
            fullWidth
            type="text"
            id="name"
            placeholder="Name"
            onChange={() => setName(document.getElementById("name").value)}
            value={name}
            required
          />
        </div>
        <div className="input-text">
          <Input
            color="secondary"
            fullWidth
            type="text"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="input-text">
          <Input
            color="secondary"
            fullWidth
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <Button variant="contained" color="secondary" onClick={handleSignUp}>
          Sign Up
          <LogoutOutlinedIcon />
        </Button>
        <Typography>
          Already have an account?{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "red",
            }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </Typography>
      </div>
    </div>
  );
};
export default SignUp;
