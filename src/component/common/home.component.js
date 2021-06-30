import React, { Component } from "react";
import moment from 'moment';
import UserService from "../../service/user.service";
import ConferenceDetailsService from "../../service/form-conference-details.service";
import homepagepic from "url:../../assets/af-homepage.jpg";
import speakerpic from "url:../../assets/af-speakerimg.jpg";



export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            conferenceDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        UserService.getPublicContentHome().then(
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

        ConferenceDetailsService.getConferenceFormDetails().then((response) => {
            this.setState({
                conferenceDetailsFormInfos: response.data,
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
            conferenceDetailsFormInfos
        } = this.state;
        
        
        return (
            <div className="container mt-3">
                <img className="container mt-3" src={homepagepic} alt="Card image cap"/>
                <div className="container-fluid">
                    <div className="card-body" text-white bg-dark>
                     {conferenceDetailsFormInfos && conferenceDetailsFormInfos.map((file, index) => (
                      <div key={index} >
                        {file.approvalStatus === true && (
                            <div>
                            <center e={file.startDate}>
                              <h2 className="card-title">{file.name}</h2>
                              <h3 className="card-text">  Starting from {this.dateFix(e)}, Will be held for  {file.noOfDays} days.</h3>
                              <h3 className="card-text"><small class="text-muted">{file.institute}</small></h3>
                            </center>
                        
                       <div className="card-body">
                            <center>
                              <h6 className="card-title">About our conference</h6>
                              <h4 className="card-title">{file.name}</h4>
                              <p className="card-text" class="text-muted">{file.name} is organized by the {file.institute}as an open forum for academics along with industry professionals to present the latest findings and research output and practical deployments in the Computer Science and Information Technology domains. Primary objective of the ICAF is to uplift the research culture and the quality of research done by Sri Lankan researchers. This conference will create a platform for national and international researchers to showcase their research output, networking opportunities to discuss innovative ideas, and initiate collaborative work. ICAF 2019 and ICAF 2020 were successfully conducted with a technical co-sponsorship by IEEE Sri Lanka Section and all publications are available in IEEE Xplore digital library</p>
                            </center>
                        </div> 
                        <div className="card">
                            <center>
                                <h1 >Keynote Speakers</h1>
                                <br></br>
                                <div className="card-body" >
                                  <img className="mr-3" src={speakerpic} alt="Card image cap"/>
                                   <br></br>
                                   <h4 className="mt-0">
                                   <br></br>
                                   <br></br>
                                    {file.speakers}
                                    <br></br>
                                    {file.speakerInstitutes}
                                    </h4>
                                </div>
                            </center>
                        </div>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
        <br></br>
                    
    </div>
        );
    }
}