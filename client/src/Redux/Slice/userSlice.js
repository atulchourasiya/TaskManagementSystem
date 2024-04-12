import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../utils/toast";

const initialState = {
  user: null,
  isLogin: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/user/registerUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        toastSuccess("User Register Successfully");
        return res;
      } else {
        const res = await response.json();
        toastError(res.message);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/user/loginUser`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(user),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      localStorage.setItem("user", JSON.stringify(res.email));
      toastSuccess("User Login Successfully");
      return res;
    } else {
      const res = await response.json();
      toastError(res.message);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers :{
    setIsLogin : (state, action )=>{
        state.isLogin = action.payload;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isLogin = true;
    },
    [loginUser.rejected]: (state) => {
      state.isLogin = false;
    },
  },
});
export const { setIsLogin } = userSlice.actions;
export default userSlice.reducer;
