/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import Form1 from "../form-conference-details.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<Form1></Form1>, div)
 })