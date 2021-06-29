import React, {Component} from "react";
import ResearchDetailsService from "../../service/form-research-details.service";

export default class ResearchDetailsApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            researchDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        ResearchDetailsService.getResearchFormDetails().then((response) => {
            this.setState({
                researchDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    handleApprove(event) {
		ResearchDetailsService.updateResearchFormDetailsApproval(
			this.setState({
                approvalStatus:true
            })

		).then(
			response => {
				this.setState({
					message: response.data.message,
					successful: true
				});
			},
			error => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				this.setState({
					successful: false,
					message: resMessage
				});
			}
		).then(
			this.state.executionOption
		);		 

		alert(this.state.name + " Research details are approved! ");
		event.preventDefault();
		console.log(this.state.startDate);
		console.log(this.state.noOfDays)
	  }


      approve(id) {
        ResearchDetailsService.updateResearchFormDetailsApproval(id)
            .then((response) => {
                this.setState({
                updateMessage: response.data.message,
            });
                window.location.reload();
        }).catch(() => {
            this.setState({
                updateMessage: "Could not update status!",
            })
        });
    
    }

    render() {
        const {
            researchDetailsFormInfos
        } = this.state;

        return (
            <div className="jumbotron">
                        <div className="alert bg-transparent">
                            <h4>Research Details needed to be approved!</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {researchDetailsFormInfos && researchDetailsFormInfos.map((file, index) => (
                                <li className="list-group-item bg-transparent" key={index}>
                                    <h5 className="card-text">Research Name : {file.name}</h5>
                                    <h5 className="card-text">Reasearch Title : {file.title}</h5>
                                    <h5 className="card-text">Reasearch Area : {file.researchArea}</h5>
                                    <h5 className="card-text">Published date : {file.publishedDate}</h5> 
                                    <h5 className="card-text">Country : {file.country}</h5> 
                                    <h5 className="card-text">Author : {file.author}</h5>
                                    <h5 className="card-text">Contributors related to the Research : {file.contributors}</h5>
                                    <h5 className="card-text">Title of the related Contributors : {file.contributorTitle}</h5>
                                    
                                    <div className="float-lg-end">
                                        {file.approvalStatus === true && (
                                            <button
                                                type="button"
                                                disabled={true}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approved
                                            </button>
                                        )}
                                        {file.approvalStatus === false && (
                                            <button
                                                type="button"
                                                onClick={() => this.approve(file.id)}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
    
                                </li>
                            ))}
                        </ul>
                    </div>
        );
    }
}