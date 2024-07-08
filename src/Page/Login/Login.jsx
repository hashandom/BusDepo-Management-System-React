import React, { useEffect, useState } from "react";
// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Stack,
  Paper,
  Box,
  Typography,
  Card,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import {useNavigate } from 'react-router-dom';
import { loadDataFromApi } from "../../Api/loadDataFromApi";
import { getEndpoint } from "../../Api/endpoints";

export default function Login() {
  const navigate = useNavigate();

  //Inputs
  const [usernameInput, setusernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Inputs Errors
  const [error, setError] = useState(false);

  // Handles Display and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  //handle Submittion
  const handleSubmit = async () => {
    setError(false)
    const requestbody = {
      token : "",
      data : {
        username : usernameInput,
        password : passwordInput
      }
    }
    
    const response = await loadDataFromApi(getEndpoint("login"), "POST", requestbody)
    if (!response.token || response.token==""){
      console.log('response',response)
      setError(`Login Failed: ${response.error}`)
    }else{
      localStorage.setItem("token",response.token)
      navigate("/")
    }
  };

  useEffect(()=>{
    localStorage.setItem("token","")
  })

  return (
    <>
      <Box
        display={'flex'}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          background:'whitesmoke',
          height:'100vh',
          width:'100vw'
        }}
      >

      <Paper
        elevation={2}
        sx={{
          width:'400px',
          minHeight:'250px'
        }}
      >
        <Stack
          spacing={2}
          padding={3}
        >

          <Box
            component="img"
            src="/Super3Logo.svg"
            maxHeight={40}
          />

          <Typography
            variant="h6"
            align="center"
          >
            Bus Depot Management System
          </Typography>


          <TextField
            label="Username"
            variant="outlined"
            value={usernameInput}
            size="small"
            onChange={(event)=>{
              setusernameInput(event.target.value)
              setError(false)
            }}
          />


          <TextField
            label="Password"
            variant="outlined"
            value={passwordInput}
            size="small"
            type={showPassword?"text":"password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>                
              )
            }}
            onChange={(event)=>{
              setPasswordInput(event.target.value)
              setError(false)
            }}
          />

          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>

          {
            error &&
            <Typography
              color={'error'}
              fontSize={12}
              align="center"
            >
              Login Failed! Please try again.
            </Typography>
          }

        </Stack>

      </Paper>
      </Box>
    </>
  );
}
