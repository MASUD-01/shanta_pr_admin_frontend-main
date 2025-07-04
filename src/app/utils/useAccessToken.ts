import { RootState, useAppSelector } from "../store/store";

const useAccessToken = () => {
  // console.log(useAppSelector((state: RootState) => state.userSlice.token));
  return useAppSelector((state: RootState) => state.userSlice.token);
};

export default useAccessToken;
