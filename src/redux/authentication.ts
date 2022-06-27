import { createSlice } from '@reduxjs/toolkit';
import useJwt from "../@core/auth/jwt/useJwt";

const config = useJwt().jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  return item
      ? JSON.parse(item)
      : {};
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      state[config.storageTokenKeyName as keyof typeof state] =
          action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName as keyof typeof state] = action.payload[
          config.storageRefreshTokenKeyName
          ];
      localStorage.setItem('userData', JSON.stringify(action.payload));
      localStorage.setItem(
          config.storageTokenKeyName, JSON.stringify(action.payload.accessToken),
      );
      localStorage.setItem(
          config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken),
      );
    },
    handleLogout: state => {
      state.userData = {};
      state[config.storageTokenKeyName as keyof typeof state] = null;
      state[config.storageRefreshTokenKeyName as keyof typeof state] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
