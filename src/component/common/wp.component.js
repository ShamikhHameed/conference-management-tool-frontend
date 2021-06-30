import React, { Component } from "react";
import moment from 'moment';
import UserService from "../../service/user.service";
import WorkshopDetailsService from "../../service/form-workshop-details.service";
import workshop6 from "../../assets/workshop7.jpg";
import speaker from "../../assets/speaker3.PNG";

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

    dateFix(e){
        window.moment = moment
        var date = moment(e);
        var dateComponent = date.utc().format("MMM Do YY");
        return dateComponent;
    }

    render() {
        const {
            e,
            workshopDetailsFormInfos
        } = this.state;
        return (
            <div className="container mt-3">
                    <img src={workshop6} className="card-img" alt="..."/>
                            <div className="container-fluid">
                                <div className="card-body" text-white bg-dark>
                                {workshopDetailsFormInfos && workshopDetailsFormInfos.map((file, index) => (
                                <div key={index} >
                                    {file.approvalStatus === true && (
                                        
                                        <center e={file.startDate}>
                                        <h2 className="card-title">{file.title}</h2>
                                        <h3 className="card-text">  Starting from {this.dateFix(e)}, Will be held for  {file.noOfDays} days.</h3>
                                        <h3 className="card-text"><small class="text-muted">{file.place}</small></h3>
                                        </center>  
                                    )}
                                   
                                    <div className="card">
                                        <center>
                                        <h4 >Keynote Speakers</h4> <br></br>
                                        <div >
                                        <img className="card-m3" src={speaker} alt="Card image cap"/>
                                        <div className="card-body">
                                        <h5 className="card-title">{file.speakers}</h5>
                                        <h4 className="card-text">{file.speakerInstitutes}</h4>
                                        </div>
                                        </div>
                                        </center>
                                </div> 
                                </div>
                                ))}
                                </div>

                                </div>
            </div>
        );
    }
}