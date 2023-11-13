/* eslint-disable no-constant-condition */
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOff from "@mui/icons-material/VisibilityOff.js";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEXP =
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

const Registration = ({ isSignup, formData, setFormData }) => {
  const { email, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [passFocus, setPassFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [confrmPassFocus, setConfrmPassFocus] = useState(false);
  const [validConfrmPass, setValidConfrmPass] = useState(false);

  const refer = useRef();
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEXP.test(password));
    setValidConfrmPass(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="email"
            ref={refer}
            onBlur={() => setEmailFocus(false)}
            onFocus={() => setEmailFocus(true)}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            variant="outlined"
            required
            fullWidth
            label="Email address"
            autoFocus
            type="email"
          />
          {isSignup && emailFocus && !validEmail && (
            <Card
              sx={{
                fontSize: "1.2rem",
                borderRadius: "5px",
                background: "grey",
                color: "#fff",
                padding: "0.55rem",
                position: "relative",
                bottom: "-10px",
              }}
            >
              {"It should be a valid email address!"}
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            name="password"
            onBlur={() => setPassFocus(false)}
            onFocus={() => setPassFocus(true)}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            variant="outlined"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {"password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignup && passFocus && !validPassword && (
            <Card
              sx={{
                fontSize: "1.2rem",
                borderRadius: "5px",
                background: "grey",
                color: "#fff",
                padding: "0.55rem",
                position: "relative",
                bottom: "-10px",
              }}
            >
              {
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
              }
            </Card>
          )}
        </Grid>

        {isSignup && (
          <Grid item xs={12} sm={12}>
            <TextField
              name="confirmPassword"
              onBlur={() => setConfrmPassFocus(false)}
              onFocus={() => setConfrmPassFocus(true)}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              variant="outlined"
              required
              fullWidth
              label="Confirm Password"
              type="password"
            />
            {!passFocus && confrmPassFocus && !validConfrmPass && (
              <Card
                sx={{
                  fontSize: "1.2rem",
                  borderRadius: "5px",
                  background: "grey",
                  color: "#fff",
                  padding: "0.55rem",
                  position: "relative",
                  bottom: "-10px",
                }}
              >
                {"Password is not match"}
              </Card>
            )}
          </Grid>
        )}
      </Grid>
      {isSignup && (
        <Button
          sx={{ mt: 3, mb: 2 }}
          disabled={
            !validEmail || !validPassword || !validConfrmPass ? true : false
          }
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      )}
      {!isSignup && (
        <Button
          sx={{ mt: 3, mb: 2 }}
          disabled={!formData.email || !formData.password ? true : false}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export default Registration;
