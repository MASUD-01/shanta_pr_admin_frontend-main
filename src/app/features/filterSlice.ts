import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterTypes<T = unknown> =
  | ({
      limit?: number;
      skip?: number;
      key?: string | undefined;
    } & {
      [key: string]: T;
    })
  | undefined;

const initialState: FilterTypes = {
  limit: 50,
  skip: 0,
  key: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },

    setSkip: (state, { payload }: PayloadAction<number>) => {
      state.skip = payload;
    },

    setKey: (state, { payload }: PayloadAction<string | undefined>) => {
      state.key = payload;
    },

    setNewTest: (
      state,
      {
        payload,
      }: PayloadAction<{
        label: string;
        value: string | number | boolean | undefined;
      }>
    ) => {
      state[payload.label] = payload.value;
    },

    setNewFilter: <T>(
      state: FilterTypes<T>,
      { payload }: PayloadAction<Partial<FilterTypes<T>>>
    ) => {
      return { ...state, ...payload };
    },

    clearFilterState: (state) => {
      state.limit = 50;
      state.skip = 0;
      state.key = undefined;

      for (const key in state) {
        if (key !== "limit" && key !== "skip" && key !== "key") {
          delete state[key];
        }
      }
    },
  },
});

export const {
  setLimit,
  setSkip,
  setKey,
  setNewFilter,
  clearFilterState,
  setNewTest,
} = filterSlice.actions;

export default filterSlice.reducer;
