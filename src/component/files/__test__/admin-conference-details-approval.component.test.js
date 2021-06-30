/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import ConferenceDetailsApproval from "../admin-conference-details-approval.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<ConferenceDetailsApproval></ConferenceDetailsApproval>, div)
 })