import { AUTH } from "../constants/actionTypes";
import { signUpAPI, loginAPI } from "../api/api";

export const signupAction =
  (formData, switchMode, postData) => async (dispatch) => {
    postData(signUpAPI, formData, (data) => {
      console.log(data);
      dispatch({ type: AUTH, payload: data });
      switchMode();
    });
  };

export const signinAction =
  (formData, navigate, postData) => async (dispatch) => {
    postData(loginAPI, formData, (data) => {
      console.log(data.data);
      localStorage.setItem("profile", data.data.access_token);
      dispatch({ type: AUTH, payload: data.data });
      navigate("/home");
    });
  };
