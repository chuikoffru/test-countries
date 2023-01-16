import { configureStore, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { countriesReducer } from "./countries.slice";

export const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({ immutableCheck: true, thunk: true });
};

export const reducer = {
  countries: countriesReducer,
};

export const store = configureStore({
  reducer,
  middleware,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type LoadingState = "idle" | "pending" | "succeded" | "failed";

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
