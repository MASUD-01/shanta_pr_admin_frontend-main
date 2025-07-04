import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userApi } from "../api/userApi/userApi";
import { token } from "../../helpers/constant";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const storedUser = localStorage?.getItem(token);

  useEffect(() => {
    if (storedUser) {
      const auth = storedUser;
      if (auth) {
        userApi.endpoints.getMe.useQuery();
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked, storedUser]);

  return authChecked;
}
