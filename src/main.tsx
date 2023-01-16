import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CountryList from "./components/CountryList";
import { store } from "./store";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <CountryList />
    </Provider>
  </React.StrictMode>
);
