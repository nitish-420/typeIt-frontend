import React from "react";

import { useDispatch } from "react-redux";

import { showAlert } from "../actions";


function Navbar(props) {

    const dispatch=useDispatch()


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-0 py-0">
            <div className="container-fluid">
                <p className="navbar-brand" onClick={()=>dispatch(showAlert("Clicked on navbar","danger"))}>Navbar</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <p className="nav-link active" aria-current="page"  onClick={()=>dispatch(showAlert("Clicked on home","success"))}>Home</p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled"  tabIndex="-1" aria-disabled="true" href="/">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Navbar