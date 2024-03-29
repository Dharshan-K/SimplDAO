/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import CreateProposal from "./Components/proposal";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VoteProposal from "./Components/voteProposal";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "createProposal", element: <CreateProposal /> },
  { path: "voteProposal/:id", element: <VoteProposal /> },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
