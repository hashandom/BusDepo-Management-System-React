import React, { useState } from "react";
import { Link } from "react-router-dom";
// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Validations
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  // Inputs
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Validation for onBlur Username
  const handleUsername = () => {
    if (usernameInput.length < 5 || usernameInput.length > 15) {
      setUsernameError(true);
      return;
    }
    setUsernameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  // Validation for onBlur Confirm Password
  const handleConfirmPassword = () => {
    if (confirmPasswordInput !== passwordInput) {
      setConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordError(false);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    setSuccess(null);
    if (usernameError || !usernameInput) {
      setFormValid("Username is set between 5 - 15 characters long. Please Re-Enter");
      return;
    }
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid("Password is set between 5 - 20 characters long. Please Re-Enter");
      return;
    }
    if (confirmPasswordError || !confirmPasswordInput) {
      setFormValid("Password and Confirm Password should match.");
      return;
    }
    setFormValid(null);
    console.log("Username: " + usernameInput);
    console.log("Email: " + emailInput);
    console.log("Password: " + passwordInput);
    console.log("Confirm Password: " + confirmPasswordInput);
    setSuccess("Form Submitted Successfully");
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", paddingBottom: "50px", width: "500px", marginTop: "100px", marginLeft: "400px" }}>
      <FaceIcon sx={{ width: "60px", height: "60px", marginLeft: "200px" }} />
      <div style={{ marginTop: "10px" }}>
        <TextField
          error={usernameError}
          label="Username"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          onBlur={handleUsername}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          variant="standard"
          sx={{ width: "100%" }}
          value={emailInput}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => setEmailInput(event.target.value)}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPasswordInput(event.target.value)}
            value={passwordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

  
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
          <Input
            error={confirmPasswordError}
            onBlur={handleConfirmPassword}
            id="standard-adornment-confirm-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => setConfirmPasswordInput(event.target.value)}
            value={confirmPasswordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          
          
  </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
      <Link to = '/forgetpassword' underline="hover">
        {'forget password'}
        </Link>
        <br />
        Already have an account ?{" "}
        <small style={{ textDecoration: "underline", color: "blue" }}>
        <Link to = '/' underline="hover">
        {'Sign In'}
        </Link>
        </small>
      </div>
    </Paper>
  );
}