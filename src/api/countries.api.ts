import axios from "axios";
import { ICountry } from "../store/countries.slice";

const request = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
});

const fetch = async () => {
  try {
    const response = await request.get<ICountry[]>(`/country`);
    return response.data;
  } catch (error) {
    throw new Error("Не удалось получить с сервера");
  }
};

const create = async (data: Pick<ICountry, "name" & "citizens">) => {
  try {
    const response = await request.post<Pick<ICountry, "id">[]>(`/country`, data);
    return response.data;
  } catch (error) {
    throw new Error("Не удалось создать на сервере");
  }
};

const update = async (country: ICountry) => {
  try {
    const response = await request.put(`/country/${country.id}`, country);
    return response.status === 200;
  } catch (error) {
    throw new Error("Не удалось обновить на сервере");
  }
};

const remove = async (id: number) => {
  try {
    const response = await request.delete<Pick<ICountry, "id">[]>(`/country/${id}`);
    return response.status === 200;
  } catch (error) {
    throw new Error("Не удалось удалить на сервере");
  }
};

export const CountriesAPI = { fetch, create, update, remove };
