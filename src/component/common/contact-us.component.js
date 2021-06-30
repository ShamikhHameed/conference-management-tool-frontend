import React, { Component } from "react";

import UserService from "../../service/user.service";
import Contactus from "../../component/common/contactus-form.component"; 

export default class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContentContactUs().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                    <Contactus/>
            </div>
        );
    }
}