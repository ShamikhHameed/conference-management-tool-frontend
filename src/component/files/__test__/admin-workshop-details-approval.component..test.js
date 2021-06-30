/**
 * @jest-environment jsdom
 */
 import React from "react";
 import ReactDOM from 'react-dom';
 import WorkshopDetailsApproval from "../admin-workshop-details-approval.component";
 import {it} from "@jest/globals";
 
 it("renders without crashing", () => {
     const div = document.createElement("div");
     ReactDOM.render(<WorkshopDetailsApproval></WorkshopDetailsApproval>, div)
 })