import * as React from "react";
import { render } from "react-dom";
import Chart from "./Chart";

import "./styles.css";

function App() {
  return (
    <div>
      <Chart />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
