import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TaskProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
