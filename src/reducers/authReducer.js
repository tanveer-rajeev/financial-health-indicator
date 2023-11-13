import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null, flag: true }, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, authData: action?.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
