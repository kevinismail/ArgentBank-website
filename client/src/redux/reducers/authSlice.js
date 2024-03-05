import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
    },   
    username: "",
    password: "",
 }, 
  
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }, 
    setUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    setUsername: (state, action) => {
      state.user.userName = action.payload;
    },
    setUsernameAndPassword: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearUsernameAndPassword: (state) => {
      state.username = "";
      state.password = "";
    },
    logout: (state) => {
      state.token = null;
      state.user = {
        email:"",
        firstName:"",
        lastName:"",
      };
      
    },     
  },
});

export const { setToken, setUser, setUsername, logout, setUsernameAndPassword, clearUsernameAndPassword } = authSlice.actions;

export default authSlice.reducer;