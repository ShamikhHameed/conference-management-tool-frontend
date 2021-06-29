import React, { Component } from 'react';
//import FormConferenceDetailsService from '../../service/form-conference-details.service';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";




class Form1 extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			institute: '',
			startDate: '',
			noOffDays: '',
			speakers: [],
			speakerInstitutes: [],
		}
		
	}
	createSI(){
		return this.state.speakerInstitutes.map((el, i) => 	
        <div class="form-row align-items-center" key={i}>
		 <div class="col-auto">
		  <div class="input-group mb-2">
           <div class="input-group-prepend">
		       <input type="text" className="form-control" placeholder="Speaker institute "  value={el||''} onChange={this.handleSpeakerInstitutesChange.bind(this, i)} />
			   <input type='button' class="btn btn-outline-danger " value='remove' onClick={this.removeSpeakerInstitutesClick.bind(this, i)}/>
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
        <div class="form-row align-items-center" key={i}>
		 <div class="col-auto">
		  <div class="input-group mb-2">
           <div class="input-group-prepend">
		       <input type="text" className="form-control" placeholder="SpeakerName"  value={el||''} onChange={this.handleChange.bind(this, i)} />
			   <input type='button' class="btn btn-outline-danger " value='remove' onClick={this.removeClick.bind(this, i)}/>
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
		// alert('A name was submitted: ' + this.state.speakers.join(', '));
		event.preventDefault();
	  }


	handleNameChange = event => {
		this.setState({
			name: event.target.value
		})
	}
	handleInstituteChange = event => {
		this.setState({
			institute: event.target.value
		})
	}
	handleStartDateChange = event => {
		this.setState({
			startDate: event.target.value
		})
	}
	handleNoOfDaysChange = event => {
		this.setState({
			noOffDays: event.target.value
		})
	}
	

	

	render() {
		const { name, institute, startDate, noOffDays,   } = this.state
		return (
	       <div className="col-md-12">
                <div className="card card-container">
                    <h2 style={{textAlign:'center'}} className="fw-bold">Conference Details</h2><br/>

			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder="name"
						value={name}
						onChange={this.handleNameChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						name="institute"
						placeholder="institute"
						value={institute}
						onChange={this.handleInstituteChange}
					/>
				</div>
				<div className="form-group">
				<label>Start Date</label>
					<input
						type="Date"
						className="form-control"
						name="startDate"
						value={startDate}
						onChange={this.handleStartDateChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="number"
						className="form-control"
						name="noOfDays"
						placeholder="No Of Days"
						value={noOffDays}
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
						onClick={this.addClick.bind(this)}/>

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
				{/* <button type="submit">Submit</button> */}
			</form>
			</div>
			</div>
		)
	}
}

export default Form1