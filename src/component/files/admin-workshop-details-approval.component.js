import React, {Component} from "react";
import WorkshopDetailsService from "../../service/form-workshop-details.service";

export default class WorkshopDetailsApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workshopDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        WorkshopDetailsService.getWorkshopFormDetails().then((response) => {
            this.setState({
                workshopDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    handleApprove(event) {
		WorkshopDetailsService.updateWorkshopFormDetailsApproval(
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

		alert(this.state.title + " workshop details are approved");
		event.preventDefault();
		console.log(this.state.startDate);
		console.log(this.state.noOfDays)
	  }


      approve(id) {
        WorkshopDetailsService.updateWorkshopFormDetailsApproval(id)
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
            workshopDetailsFormInfos
        } = this.state;

        return (
            <div className="jumbotron">
                        <div className="alert bg-transparent">
                            <h4>Workshop Details needed to be approve</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {workshopDetailsFormInfos && workshopDetailsFormInfos.map((file, index) => (
                                <li className="list-group-item bg-transparent" key={index}>
                                    <h5 className="card-text">Workshop Title : {file.title}</h5>
                                    <h5 className="card-text">Workshop Time : {file.time}</h5>            
                                    <h5 className="card-text">Place : {file.place}</h5>
                                    <h5 className="card-text">Workshop Starting date : {file.startDate}</h5> 
                                    <h5 className="card-text">No of days workshop, going to be held : {file.noOfDays}</h5> 
                                    <h5 className="card-text">Speakers of workshop : {file.speakers}</h5>
                                    <h5 className="card-text">Institutes of speakers : {file.speakerInstitutes}</h5>
                                    
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