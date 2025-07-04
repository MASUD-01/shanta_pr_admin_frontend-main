import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlice from "../slice/themeSlice";
import modalSlice from "../slice/modalSlice";
import userSlice from "../features/userSlice";
import { api } from "../api/userApi/api";
import { userApi } from "../api/userApi/userApi";
import filterSlice from "../features/filterSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    themeSlice: themeSlice,
    modalSlice: modalSlice,
    userSlice: userSlice,
    filter: filterSlice,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      userApi.middleware,
    ]),
  // preloadedState: { user: user() },
});
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
