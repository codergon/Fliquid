import "./styles/main.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MoralisProvider
      appId={process?.env?.REACT_APP_MORALIS_APPLICATION_ID + ""}
      serverUrl={process?.env?.REACT_APP_MORALIS_SERVER_URL + ""}
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
