import React, { Component } from "react";
import moment from 'moment';
import UserService from "../../service/user.service";
import ResearchDetailsService from "../../service/form-research-details.service";

export default class RP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            researchDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        UserService.getPublicContentRP().then(
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
        ResearchDetailsService.getResearchFormDetails().then((response) => {
            this.setState({
                researchDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    dateFix(e){
        window.moment = moment
        var date = moment(e);
        var dateComponent = date.utc().format("MMM Do YY");
        return dateComponent;
    }
    
    render() {
        const {
            researchDetailsFormInfos
        } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                            <h3>{this.state.content}</h3>
                </header>
                <div className="jumbotron">
                    <div className="alert bg-transparent">
                        <h4>Research Details needed to be approved!</h4>
                    </div>
                    <ul className="list-group list-group-flush">

                        {researchDetailsFormInfos && researchDetailsFormInfos.map((file, index) => (

                            <li className="list-group-item bg-transparent" key={index}>
                                {file.approvalStatus === true &&(
                                    <div>
                                        <h5 className="card-text">Research Name : {file.name}</h5>
                                        <h5 className="card-text">Reasearch Title : {file.title}</h5>
                                        <h5 className="card-text">Reasearch Area : {file.researchArea}</h5>
                                        <h5 className="card-text">Published date : {file.publishedDate}</h5> 
                                        <h5 className="card-text">Country : {file.country}</h5> 
                                        <h5 className="card-text">Author : {file.author}</h5>
                                        <h5 className="card-text">Contributors related to the Research : {file.contributors}</h5>
                                        <h5 className="card-text">Title of the related Contributors : {file.contributorTitle}</h5>
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