import {USER_REGISTER, USER_SIGN_IN, USER_SIGN_OUT} from './type';
export const userSignUp = (data) => (dispatch) => {
  dispatch(userSignIn(data));
  dispatch({
    type: USER_REGISTER,
    payload: data,
  });
};

export const userSignIn = (data) => (dispatch) => {
  dispatch({
    type: USER_SIGN_IN,
    payload: data,
  });
};

export const userLogOut = (data) => (dispatch) => {
  dispatch({
    type: USER_SIGN_IN,
    payload: {},
  });
};
