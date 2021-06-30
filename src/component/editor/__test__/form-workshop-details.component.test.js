/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import Form2 from "../form-workshop-details.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<Form2></Form2>, div)
 })