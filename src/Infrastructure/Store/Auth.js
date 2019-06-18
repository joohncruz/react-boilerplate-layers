import AuthService from 'Infrastructure/Services/AuthService';
import { Token } from 'Common/Helpers/AuthHelper';
import { history } from 'Config/History';

export const STORE_NAME = 'auth';

export const INITIAL_STATE = {
  data: {},
  logged: false,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
  success: false,
};

export const LOAD_AUTH_STARTED = `${STORE_NAME}/LOAD_AUTH_STARTED`;
export const LOAD_AUTH_SUCCEED = `${STORE_NAME}/LOAD_AUTH_SUCCEED`;
export const LOAD_AUTH_FAILED = `${STORE_NAME}/LOAD_AUTH_FAILED`;

export const loadAuthStarted = () => ({ type: LOAD_AUTH_STARTED });
export const loadAuthSucceed = data => ({ type: LOAD_AUTH_SUCCEED, data });
export const loadAuthFailed = error => ({ type: LOAD_AUTH_FAILED, error });

export const loadAuth = ({ email, password }) => async (dispatch) => {
  dispatch(loadAuthStarted());
  const authService = new AuthService();

  try {
    const data = await authService.login({ email, password });
    Token.save(data);
    dispatch(loadAuthSucceed(data));
    history.push('/');
  } catch (err) {
    dispatch(loadAuthFailed(err));
  }
};

export const LOAD_LOGOUT_STARTED = `${STORE_NAME}/LOAD_LOGOUT_STARTED`;
export const LOAD_LOGOUT_FAILED = `${STORE_NAME}/LOAD_LOGOUT_FAILED`;
export const LOAD_LOGOUT_SUCCEED = `${STORE_NAME}/LOGOUT_SUCCEED`;

export const loadLogoutStarted = () => ({ type: LOAD_LOGOUT_STARTED });
export const loadLogoutSucceed = (data = {}) => ({
  type: LOAD_LOGOUT_SUCCEED,
  data,
});
export const loadLogoutFailed = error => ({ type: LOAD_LOGOUT_FAILED, error });

export const loadLogout = () => async (dispatch) => {
  dispatch(loadLogoutStarted());
  try {
    Token.remove();
    dispatch(loadLogoutSucceed());
    window.stop();
    return Promise.resolve({});
  } catch (error) {
    dispatch(loadLogoutFailed(error.response.data));
    return Promise.reject(error.response);
  }
};

// Reducer
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_AUTH_STARTED:
      return {
        ...state,
        loginLoading: true,
      };
    case LOAD_AUTH_SUCCEED:
      return {
        ...state,
        logged: true,
        loginLoading: false,
        loginError: null,
        success: true,
        data: {
          ...action.data,
        },
      };
    case LOAD_AUTH_FAILED:
      return {
        ...state,
        logged: false,
        loginLoading: false,
        success: false,
        loginError: action.error,
      };

    case LOAD_LOGOUT_STARTED:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOAD_LOGOUT_SUCCEED:
      return {
        ...state,
        logged: false,
        logoutLoading: false,
        logoutError: null,
        data: {},
      };
    case LOAD_LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;