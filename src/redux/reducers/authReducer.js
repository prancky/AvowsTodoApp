import {USER_REGISTER, USER_SIGN_IN, USER_SIGN_OUT} from '../actions/type';
const initialState = {
  userList: [],
  userInfo: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    case USER_SIGN_IN:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
