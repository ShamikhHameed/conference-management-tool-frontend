import React, { Component } from 'react';
import image from '../../assets/contact.jpg';
import image2 from '../../assets/feature-icon-03.svg';
import image3 from '../../assets/feature-icon-01.svg';

class ContactUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <div className="card bg-secondary mb-3 text-white">
                <img src={image} alt="1" />
                <div className="card-img-overlay">
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" className="btn btn-dark">Contact Us</a>
                </div>
          </div>
          <div className="card-group">
             <div className="card">
	  	       <center>
	  		        <div className="feature-icon">
                 <img src={image2} alt="something" />
	  		        </div>
		  	        <div className="card-body">
			            <h5 className="card-title">Talk to Management</h5>
			            <p className="text-sm mb-0">Interested in Conference Management's marketing software?&nbsp; Just pick up the phone to chat with a member of our team.Let's see how we can work together!&nbsp; Just pick up the phone to chat with a member of our team.</p>
		    	        <br/>
				          <a href="#" className="btn btn-link">94110107652</a>/<a href="#" className="btn btn-link">94110107647</a>
		  	        </div>
		          </center>
		          </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		        <div className="card">
	  	      <center>
	  		      <div className="feature-icon">
                <img src={image3} alt="something" />
	  		      </div>
		  	      <div className="card-body">
			          <h5 className="card-title">Contact Customer Support</h5>
			          <p className="text-sm mb-0">Sometimes you need a little help from your friends or a Conference Management support.<br/> Our support team is Ready.&nbsp; Hurry up! Don't worry, we're here for you...</p>
		    	      <br/>
				        <a href="#" className="btn btn-link">icafsupport@gmail.com</a>
			        </div>
		        </center>
		        </div>
		      </div>

        <div className="card bg-dark mb-3 text-white">
          <form>
            <div className="form-group">
              <label for="exampleFormControlInput1">Full Name</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Full Name"/>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Message</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-secondary">Submit</button>
          </form>
        </div>
        <br></br>
      </div>
    )
  }
}

export default ContactUs;