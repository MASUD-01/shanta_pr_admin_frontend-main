import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { FilterTypes, setNewTest } from "../features/filterSlice";

const useQueryParams = <
  T extends Partial<Record<string, string | number | boolean>>
>(
  data?: T
) => {
  const initialState = useSelector((state: RootState) => state.filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        dispatch(setNewTest({ label: key, value: data[key] }));
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(searchParams);

    Object.keys(initialState as keyof FilterTypes).forEach((key: string) => {
      const value: unknown = initialState[key];

      if (key !== "_persist" && value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params.toString());
  }, [initialState, searchParams, setSearchParams]);

  const filteredData: {
    [k: string]: unknown;
  } = Object.fromEntries(
    Object.entries(initialState).filter(([key, value]) => {
      if (key !== "_persist" && value) {
        return initialState;
      }
    })
  );

  return filteredData as T;
};

export default useQueryParams;
