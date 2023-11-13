import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration";
import useAxiosPost from "../../hook/useAxiosPost";
import { signinAction, signupAction } from "../../actions/authActions";

const Auth = () => {
  const [res, postData] = useAxiosPost();
  console.log(res);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signupAction(formData, switchMode, postData));
    } else {
      dispatch(signinAction(formData, navigate, postData));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
        elevation={6}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "secondary.main",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>

        <Box
          component="form"
          sx={{
            alignItems: "center",
            padding: "10px",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Registration
            isSignup={isSignup}
            formData={formData}
            setFormData={setFormData}
          />
        </Box>

        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account ? Sign Up"
                : "Don't have an account Sign"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
