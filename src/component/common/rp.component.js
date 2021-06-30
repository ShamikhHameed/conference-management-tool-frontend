import React, { Component } from "react";
import moment from 'moment';
import UserService from "../../service/user.service";
import ResearchDetailsService from "../../service/form-research-details.service";
import researchpagepic from "url:../../assets/research7.jpg";
import research1pagepic from "url:../../assets/research3.jpg";

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
            e,
            researchDetailsFormInfos
        } = this.state;
        
        return (
            <div className="container mt-3">
                <img src={researchpagepic} className="card-img" alt="..."/>
                <div className="container-fluid">
                    <div className="card-body" text-white bg-dark>
                    {researchDetailsFormInfos && researchDetailsFormInfos.map((file, index) => (
                      <div key={index} >
                        {file.approvalStatus === true && (
                            
                            <center e={file.publishedDate}>
                              <h2 className="card-title">{file.name}</h2>
                              <h4 className="card-text">  Published on {this.dateFix(e)} and is based on "{file.researchArea}"</h4>
                              <h3 className="card-text"><small class="text-muted">{file.title}</small></h3>
                           
                      
                      <div className="card">
                                        <center>
                                        <h4 >RESEARCH PUBLICATIONS</h4> <br></br>
                                        <div >
                                        <img className="card-m3" src={research1pagepic} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title"><a href="https://papersowl.com/examples/apple-environmental-analysis-and-branding-strategies/" class="stretched-link">{file.name}</a></h5>
                                                
                                            <h6 className="card-text">{file.title}</h6>
                                            <h6 className="card-text">-{file.author}-</h6>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">Last updated few secs ago</small>
                                        </div>
                                        </div>
                                        </center>
                                </div> 
                                <br></br><br></br>
                                </center>
                                 )}
                                </div>
                                ))}
                                </div>

                                </div>
            </div>
        );
    }
}