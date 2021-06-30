/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import Form3 from "../form-research-details.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<Form3></Form3>, div)
 })