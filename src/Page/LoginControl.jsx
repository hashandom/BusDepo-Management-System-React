import React from 'react'
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import Login from "../LoginControl/login";
import Signup from "../LoginControl/signup";
function LoginControl() {
  
    const [checked, setChecked] = useState(true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  return (
    <div className="App">
      <Paper elevation={3} style={{ padding: "20px", paddingBottom: "50px",width:"500px", marginTop:"100px", marginLeft:"500px" }}>
        <div align="center">
          {checked ? (
            <Chip
              icon={<LockIcon />}
              label="Log In"
              variant="outlined"
              color="info"
            />
          ) : (
            <Chip
              icon={<FaceIcon />}
              label="Sign Up"
              variant="outlined"
              color="info"
            />
          )}
          <br />

          
        </div>

        {checked ? <Login /> : <Signup />}
      </Paper>
    </div>
  );
}

export default LoginControl;
