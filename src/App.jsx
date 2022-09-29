import React from "react";
import { ReactDOM } from "react";
import Navbar from "./components/navbar";
import Box1 from "./components/main";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../node_modules/react-bootstrap'

import "./App.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <div id="maindiv">
        <div id="box1-div">
          <Box1 />
        </div>
      </div>
    </div>
  );
}
