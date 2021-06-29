import React, { Component } from 'react';
import FormResearchPaperDetailsService from '../../service/form-research-details.service';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Form3 extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			title: '',
			researchArea: '',
			publishedDate: new Date(),
			country: '',
			author: '',
			contributors: [],
			contributorTitle: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleResearchAreaChange = this.handleResearchAreaChange.bind(this);
		this.handlePublishedDateChange = this.handlePublishedDateChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleContributorTitleChange = this.handleContributorTitleChange.bind(this);

	}


	createSI(){
		return this.state.contributorTitle.map((el, i) =>
			<div className="form-row align-items-center" key={i}>
				<div className="col-auto">
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<input type="text" className="form-control" placeholder=" Contributor Title "  value={el||''} onChange={this.handleContributorTitleChange.bind(this, i)} />
							<input type='button' className="btn btn-outline-danger " value='remove' onClick={this.removeContributorTitleClick.bind(this, i)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	handleContributorTitleChange(i, event) {
		let contributorTitle = [...this.state.contributorTitle];
		contributorTitle[i] = event.target.value;
		this.setState({ contributorTitle });
	}

	addContributorTitleClick(){
		this.setState(prevState => ({ contributorTitle: [...prevState.contributorTitle, '']}))
	}

	removeContributorTitleClick(i){
		let contributorTitle = [...this.state.contributorTitle];
		contributorTitle.splice(i,1);
		this.setState({ contributorTitle });
	}

	createUI(){
		return this.state.contributors.map((el, i) =>
			<div className="form-row align-items-center" key={i}>
				<div className="col-auto">
					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<input type="text" className="form-control" placeholder="ContributorName"  value={el||''} onChange={this.handleChange.bind(this, i)} />
							<input type='button' className="btn btn-outline-danger " value='remove' onClick={this.removeClick.bind(this, i)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	handleChange(i, event) {
		let contributors = [...this.state.contributors];
		contributors[i] = event.target.value;
		this.setState({ contributors });
	}

	addClick(){
		this.setState(prevState => ({ contributors: [...prevState.contributors, '']}))
	}

	removeClick(i){
		let contributors = [...this.state.contributors];
		contributors.splice(i,1);
		this.setState({ contributors });
	}

	handleSubmit(event) {
		FormResearchPaperDetailsService.submit(
			this.state.name,
			this.state.title,
			this.state.researchArea,
			this.state.publishedDate,
			this.state.country,
			this.state.author,
			this.state.contributors,
			this.state.contributorTitle

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

		alert(this.state.name + " Research Paper details submitted successfully!");
		event.preventDefault();
		this.props.history.push('../component/admin/board-admin.component')
		console.log(this.state.publishedDate)
	}


	handleNameChange = event => {
		this.setState({
			name: event.target.value
		})
	}
	handleTitleChange = event => {
		this.setState({
			title: event.target.value
		})
	}
	handleResearchAreaChange = event => {
		this.setState({
			researchArea: event.target.value
		})
	}
	handlePublishedDateChange =date => {
		this.setState({
			publishedDate: date
		})
	}
	handleCountryChange = event => {
		this.setState({
			country: event.target.value
		})
	}
	handleAuthorChange = event => {
		this.setState({
			author: event.target.value
		})
	}

	render() {
		const { name, title, researchArea, publishedDate, country, author } = this.state

		return (
			<div className="col-md-12">
				<div className="card card-container">
					<h2 style={{textAlign:'center'}} className="fw-bold">Research Paper Details</h2><br/>

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
							name="title"
							placeholder="Title"
							value={title}
							onChange={this.handleTitleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="researchArea"
							placeholder="Research Area"
							value={researchArea}
							onChange={this.handleResearchAreaChange}
						/>
					</div>

					<div className="form-group">
					<label>Published Date</label>
					<DatePicker
						selected={ this.state.publishedDate }
						onChange={ this.handlePublishedDateChange }
						name="publishedDate"
						dateFormat="yyyy-MM-dd"
					/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country"
							value={country}
							onChange={this.handleCountryChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="author"
							placeholder="Author"
							value={author}
							onChange={this.handleAuthorChange}
						/>
					</div>

					<div className="form-group">
					<label>Contributor Details</label>
						{this.createUI()}        
						<input 
							type='button' 
							className="btn btn-outline-secondary btn-block"
							value='Add New Contributor' 
							onClick={this.addClick.bind(this)}/>

						{this.createSI()}        
						<input 
							type='button' 
							className="btn btn-outline-secondary btn-block "
							value='Add Contributor Title' 
							onClick={this.addContributorTitleClick.bind(this)}
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

export default Form3