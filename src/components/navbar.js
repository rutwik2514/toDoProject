import React from "react";
import { ReactDOM } from "react";

export default function Navbar(){
    return(
        <div className="row m-3 justify-content-center align-items-center" id = "nav-div">
            <div className="col-md-6 bg-dark rounded-pill">
                <h1 className="text-center text-light" id="nav-title">My to-do list App</h1>
            </div>
        </div>
    )
  }