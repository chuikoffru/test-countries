import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState, RootState } from ".";
import { CountriesAPI } from "../api/countries.api";

export interface ICountry {
  id: number;
  name: string;
  citizens: number;
}

type CountriesState = {
  items: ICountry[];
  loading: LoadingState;
};

const initialState: CountriesState = {
  items: [],
  loading: "idle",
};

export const fetchCountries = createAsyncThunk("countries/fetch", async () => {
  try {
    const countries = await CountriesAPI.fetch();
    return countries;
  } catch (error) {
    throw new Error("Не удалось загрузить список стран");
  }
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setLoader(state, action: PayloadAction<LoadingState>) {
      return { ...state, loading: action.payload };
    },
    remove(state, action: PayloadAction<number>) {
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    },
    add(state, action: PayloadAction<ICountry>) {
      return { ...state, items: state.items.concat(action.payload) };
    },
    update(state, action: PayloadAction<ICountry>) {
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (_, action) => {
        return { loading: "succeded", items: action.payload };
      })
      .addCase(fetchCountries.pending, (state) => {
        return { ...state, loading: "pending" };
      })
      .addCase(fetchCountries.rejected, (state) => {
        return { ...state, loading: "failed" };
      });
  },
});

export const selectCountries = (state: RootState) => state.countries;

export const { actions: CountriesStore, reducer: countriesReducer } = countriesSlice;
