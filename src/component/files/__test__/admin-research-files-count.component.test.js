/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import ResearchDetailsApproval from "../admin-research-details-approval.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<ResearchDetailsApproval></ResearchDetailsApproval>, div)
 })