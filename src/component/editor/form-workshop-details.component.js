import React, { Component } from 'react';
import FormWorkshopDetailsService from '../../service/form-workshop-details.service';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Form2 extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			time: '',
			place:'',
			startDate: new Date(),
			noOfDays: 0,
			speakers: [],
			speakerInstitutes: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handlePlaceChange = this.handlePlaceChange.bind(this);
		this.handleNoOfDaysChange = this.handleNoOfDaysChange.bind(this);
		this.handleSpeakerInstitutesChange = this.handleSpeakerInstitutesChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
	}


	createSI(){
		return this.state.speakerInstitutes.map((el, i) =>
			<div className="form-row align-items-center" key={i}>
				<div className="col-auto">
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<input type="text" className="form-control" placeholder="Speaker institute "  value={el||''} onChange={this.handleSpeakerInstitutesChange.bind(this, i)} />
							<input type='button' className="btn btn-outline-danger " value='remove' onClick={this.removeSpeakerInstitutesClick.bind(this, i)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	handleSpeakerInstitutesChange(i, event) {
		let speakerInstitutes = [...this.state.speakerInstitutes];
		speakerInstitutes[i] = event.target.value;
		this.setState({ speakerInstitutes });
	}

	addSpeakerInstitutesClick(){
		this.setState(prevState => ({ speakerInstitutes: [...prevState.speakerInstitutes, '']}))
	}

	removeSpeakerInstitutesClick(i){
		let speakerInstitutes = [...this.state.speakerInstitutes];
		speakerInstitutes.splice(i,1);
		this.setState({ speakerInstitutes });
	}

	createUI(){
		return this.state.speakers.map((el, i) =>
			<div className="form-row align-items-center" key={i}>
				<div className="col-auto">
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<input type="text" className="form-control" placeholder="SpeakerName"  value={el||''} onChange={this.handleChange.bind(this, i)} />
							<input type='button' className="btn btn-outline-danger " value='remove' onClick={this.removeClick.bind(this, i)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	 
	 handleChange(i, event) {
		let speakers = [...this.state.speakers];
		speakers[i] = event.target.value;
		this.setState({ speakers });
	 }
	 
	 addClick(){
	   this.setState(prevState => ({ speakers: [...prevState.speakers, '']}))
	 }
	 
	 removeClick(i){
		let speakers = [...this.state.speakers];
		speakers.splice(i,1);
		this.setState({ speakers });
	 }

	 handleSubmit(event) {
		FormWorkshopDetailsService.submit(
			this.state.title,
			this.state.time,
			this.state.place,
			this.state.startDate,
			this.state.noOfDays,
			this.state.speakers,
			this.state.speakerInstitutes

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
	
			alert(this.state.title + " workshop details submitted successfully");
			event.preventDefault();
			this.props.history.push('../component/admin/board-admin.component')
			console.log(this.state.startDate);
			console.log(this.state.noOfDays)
		  }

	handleTitleChange = event => {
		this.setState({
			title: event.target.value
		})
	}
	handleTimeChange = event => {
		this.setState({
			time: event.target.value
		})
	}
	handlePlaceChange = event => {
		this.setState({
			place: event.target.value
		})
	}
	
	handleStartDateChange =date => {
		this.setState({
		  startDate: date
		})
	}

	handleNoOfDaysChange = event => {
		this.setState({
			noOfDays: event.target.value
		})
	}

	

	render() {
		const { title, time,place,startDate, noOfDays  } = this.state

		return (
	       <div className="col-md-12">
                <div className="card card-container">
                    <h2 style={{textAlign:'center'}} className="fw-bold">Workshop Details</h2><br/>

					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="title"
								placeholder="title"
								value={title}
								onChange={this.handleTitleChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="time"
								className="form-control"
								name="time"
								placeholder="time"
								value={time}
								onChange={this.handleTimeChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="place"
								placeholder="place"
								value={place}
								onChange={this.handlePlaceChange}
							/>
						</div>
						<div className="form-group">
						<label>Start Date</label>
						<DatePicker
							selected={ this.state.startDate }
							onChange={ this.handleStartDateChange }
							name="startDate"
							dateFormat="yyyy-MM-dd"
						/>
						</div>
						<div className="form-group">
							<input
								type="number"
								className="form-control"
								name="noOfDays"
								placeholder="No Of Days"
								value={noOfDays}
								onChange={this.handleNoOfDaysChange}
							/>
						</div>
						<div className="form-group">
							<label>Speaker Details</label>
							{this.createUI()}
								<input
									type='button'
									className="btn btn-outline-secondary btn-block"
									value='Add speaker'
									onClick={this.addClick.bind(this) }/>{""} &nbsp;
							{this.createSI()}
								<input
									type='button'
									className="btn btn-outline-secondary btn-block "
									value='Add speaker institute'
									onClick={this.addSpeakerInstitutesClick.bind(this)}
								/>
						</div>
						<hr/>
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-dark btn-block"
								disabled={this.state.loading}
							>
							{this.state.loading && (
							<span className="spinner-border spinner-border-sm"></span>
							)}
							<span>Submit</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Form2