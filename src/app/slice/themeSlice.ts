import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MappingAlgorithm, theme } from 'antd';
import { RootState } from '../store/store';

interface IState {
  theme: MappingAlgorithm | MappingAlgorithm[] | undefined;
}
const initialState: IState = {
  theme:
    localStorage.getItem('theme') === 'darkTheme'
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm,
};
const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setTheme(
      state,
      action: PayloadAction<MappingAlgorithm | MappingAlgorithm[] | undefined>
    ) {
      state.theme = action.payload;
      if (state.theme === theme.darkAlgorithm) {
        localStorage.setItem('theme', 'darkTheme');
      } else {
        localStorage.setItem('theme', 'defaultTheme');
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const globalTheme = (state: RootState) => state.themeSlice;

export default themeSlice.reducer;
