import "./style.css";
import { header, main, footer } from "./dom.js";
import { renderHeader, renderMain, renderFooter } from "./dom.js";

const init = () => {
  const body = document.body;

  renderHeader();
  renderMain();
  renderFooter();

  body.append(header, main, footer);
};

main.addEventListener("click", (e) => {
  const startButton = e.target.closest("button", "start");
  if (startButton) {
  }
});

init();
