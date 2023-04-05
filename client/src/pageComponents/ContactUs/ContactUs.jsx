import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import './ContactUs.css';

// use axios module for http requests
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})
// configure react component
class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            comment: '',
            showAlert: false
        }
    }
   // function to handle form submission
    handleSubmission = (e)=> {
        e.preventDefault();
        e.persist();
        const data = this.state;
       api.post('/addComment', data).then((response)=>{
            this.setState({showAlert: true});
        })
        .catch(error=>{
            console.log('Problem with addComment. error:');
            console.log(error);
        });
    }
    // function to handle Alert component OK button
    handleAlertOk = () => {
        this.setState({showAlert: false});
    }
    // render React Component 
    render() {
        if (this.state.showAlert) {
            // alternate render after comment has been submitted
        return(
            <Alert variant="primary" className= "alert">
                <Alert.Heading><b><i>Your Comment Has Been Sent!</i></b></Alert.Heading> 
                <h4>Your business is important to us. Thank you for Comments. You will receive a response via email </h4><hr />
                <h4 className="note m-4">Please check out our great products and Dynamite prices!. </h4>
                <button className ="btn btn-dark" onClick={this.handleAlertOk}>OK</button>
                <button className ="btn btn-dark" onClick={() => this.props.history.push('/products')}>See Products</button>
            </Alert>
             )
        }
        return(
            <div className="contactForm">
                <h1><i className="edit icon"></i> Contact Us</h1>
                <form  onSubmit={this.handleSubmission}>
                    <div className="form-group offset-sm-1">
                        <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                            <div className="col-11">
                                <input 
                                type="text" 
                                className="form-control" 
                                name= 'name' 
                                placeholder="First Last" 
                                value={this.state.name}
                                onChange = {(e)=> this.setState({name: e.target.value})}
                                autoFocus
                                required/>
                            </div>
                    </div>
                    <div className="form-group offset-sm-1">
                        <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                            <div className="col-11">
                                <input type="email" 
                                className="form-control" 
                                name = 'email' 
                                placeholder="Email" 
                                value={this.state.email}
                                onChange = {(e)=> this.setState({email: e.target.value})}
                                required/>
                            </div>
                    </div>
                    <div className="form-group offset-sm-1">
                        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                        <div className="col-11">
                            <input type="text" 
                            className="form-control" 
                            id="subject" 
                            name = 'subject' 
                            placeholder="enter subject" 
                            value={this.state.subject}
                            onChange = {(e)=> this.setState({subject: e.target.value})}
                            required/>
                        </div>
                    </div>
                    <div className="form-group offset-sm-1">
                        <label htmlFor="comment" className="col-sm-2 control-label">Question/Comment</label>
                        <div className="col-sm-8">
                            <textarea type="text" 
                            className="form-control" 
                            name = 'comment' 
                            placeholder="How can we help you?" 
                            value={this.state.comment}
                            onChange = {(e)=> this.setState({comment: e.target.value})}
                            required></textarea>
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col p-3 text-end">
                            <button type="submit" className="btn btn-dark com-btn" >Submit Comment<i className = "long arrow right icon"></i></button>
                        </div>
                    </div>
                </form>
            </div>
            )
    }
};

export default withRouter(ContactUs);