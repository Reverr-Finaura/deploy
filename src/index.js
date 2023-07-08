import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import Test from "./TestPage/Test";
import EnterOtp from "./pages/EnterOtp/EnterOtp";
import EnterOtpUpdated from "./pages/EnterOtpUpdated/EnterOtpUpdated";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
     

    </Provider>
  </BrowserRouter>
);
