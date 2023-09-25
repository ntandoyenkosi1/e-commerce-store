import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
const CreateCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function handleSave() {
    if (name == "") {
      return alert("Enter name");
    }
    var myHeaders = new Headers();
    var token = localStorage.getItem("token");
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/categories", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result.ok) {
          return alert("Category created successfully");
        } else {
          navigate("/internal-error");
        }
      })
      .catch((error) => {
        navigate("/internal-error");
      });
  }
  return (
    <div className="center">
      <div className="icon">
        <AddCircleIcon color="secondary" fontSize="large" />
      </div>
      <h1>Add new category</h1>
      <div>
        <TextField
          variant="standard"
          label="Category name"
          type="text"
          id="name"
          onChange={() => setName(document.getElementById("name").value)}
          value={name}
          placeholder="Category name"
        />
      </div>
      <Button variant="contained" color="secondary" onClick={handleSave}>
        <SaveOutlinedIcon />
        Save
      </Button>
    </div>
  );
};
export default CreateCategory;
