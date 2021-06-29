import React, { Component } from "react";

import UserService from "../../service/user.service";
import WorkshopDetailsService from "../../service/form-workshop-details.service";
import workshop1 from "../../assets/workshop1.jpg";
import workshop2 from "../../assets/workshop2.jpg";
import workshop4 from "../../assets/workshop4.jpg";


export default class WP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            workshopDetailsFormInfos: [],
        };
    }

    

    componentDidMount() {
        UserService.getPublicContentWP().then(
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
        WorkshopDetailsService.getWorkshopFormDetails().then((response) => {
            this.setState({
                workshopDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    render() {
        const {
            workshopDetailsFormInfos
        } = this.state;
        return (
            <div className="container">
                <img src={workshop4} className="card-img-top" alt="1" />

                <br></br><br></br>

                <div className="jumbotron">
                    <div className="alert bg-transparent">
                        <h4>Workshop Details needed to be approve</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        {workshopDetailsFormInfos && workshopDetailsFormInfos.map((file, index) => (
                            <li className="list-group-item bg-transparent" key={index}>
                                {file.approvalStatus === true &&(
                                    <div>
                                        <h1 className="card-text">{file.title}</h1>
                                        <h3 className="card-text">Workshop Time : {file.time}</h3>
                                        <h3 className="card-text">Workshop Place : {file.place}</h3>
                                        <h5 className="card-text">Workshop Starting date : {file.startDate}</h5>
                                        <h5 className="card-text">No of days workshop, going to be held : {file.noOfDays}</h5>
                                        <h5 className="card-text">Speakers of workshop : {file.speakers}</h5>
                                        <h5 className="card-text">Institutes of speakers : {file.speakerInstitutes}</h5>
                                        <br></br>
                                    </div>
                                )}

                            </li>
                        ))}


                    </ul>
                </div>
            </div>
        );
    }
}