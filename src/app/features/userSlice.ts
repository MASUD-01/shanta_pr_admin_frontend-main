import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IUser } from '../../auth/types/authTypes';
import { token } from '../../helpers/constant';

const storedUser = localStorage.getItem(token);
interface IUserState {
  user: IUser | null;
  token: string | null;
}

const initialState: IUserState = {
  user: null,
  token: storedUser ? storedUser : null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem(token, action.payload);
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      console.log('logout called');
      localStorage.removeItem(token);
      state.user = null;
      state.token = null;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setToken, setLogout } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice;
