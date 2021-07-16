import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.addEventListener("mousedown", function (e) {
  document.body.classList.add("mouse-navigation");
  document.body.classList.remove("kbd-navigation");
});
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 9) {
    document.body.classList.add("kbd-navigation");
    document.body.classList.remove("mouse-navigation");
  }
});
window.addEventListener("click", function (e) {
  if (!e.target) return;
  const target = e.target as HTMLElement; // sorry
  if (target.tagName !== "A") return;
  if (target.getAttribute("href") === "#") {
    e.preventDefault();
  }
});
