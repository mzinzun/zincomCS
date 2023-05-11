import React, {Component} from 'react';
import './CheckOut.css';
import {withRouter} from 'react-router-dom';
import SubmitNotice  from '../../components/SubmitNotice';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lName: "", fName:"", email: "",address: "",city: "",state: "",zip:"",
            password: "",cardNum: "",ccType: "",phone: "",
            payloadList: [],
			purchaseTotal: 0,
            checkEmail: '',
            checkPlaceHolder: 'Enter Email Address'
        };
    };
    componentDidMount () {
        // access to Checkout Page through Shopping cart (With Products to Purchase) only
        // otherwise, redirect to home page
        (this.props.productSelections.length < 1)&&this.props.history.push('./home'); 
        const pTot = this.props.productSelections.reduce( ((acc,item) => acc + item.price),0)
        this.setState({purchaseTotal: pTot}) ;
    };
    // Function to display Submit Notice after Submission Notice
    handleDisplay = ()=> {
        this.refs.coContainer.setAttribute("hidden", "true");
        this.refs.subContainer.removeAttribute("hidden");
    };
    // Function to handle form Submission
    handleSubmitForm =(e) => {
        e.preventDefault();
        e.persist();
        // create purchased items objects for each item
        const purchasedItems = this.props.productSelections.map((item) =>  {
            const obj = {
                sku: item.sku,
                price: item.price,
                qty: item.qty
            }
            return obj;
        });
        this.setState({payLoadList: JSON.stringify(purchasedItems)}, ()=> {
            const payload = {
                fName: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                phone: this.state.phone,
                purchases: {
                    purchaseDate: this.getTheDate(),
                    ccType: this.state.ccType,
                    cardNum: this.state.cardNum,
                    items: this.state.payLoadList
                }
            };  
            api.put('/addCustomerPurchase',payload)
            .then(response => {
                if (response.data.successful === false) {
                    console.log('Something went wrong. Error is:');
                    console.log(response.data.error);
                } else   {
                    this.handleDisplay();
                }

            });
        });
 // Function to handle form button events
    }
    handleButtons =  (e) => {
        e.preventDefault();
        e.persist();
        switch(e.target.id) {
            case "cancel" :
                this.props.handleProductSelections ([]);
                this.props.history.push('/products');
            break;
            case "return" :
                this.props.history.go(-1);
            break;
        }
    };
    getTheDate = ()=> {
        const date = new Date();
        const currentDate = (date.getMonth()+1)+ '/'+date.getDate()+'/'+date.getFullYear();
        const finalDate = currentDate.trim();
        return finalDate;
    };
    // function to retreive existing Customer email
    handleEmailCheck = (e) => {
		const email = (this.state.checkEmail).trim();
		if (email !== '') {
			api.get(`/getCustomerByEmail/${email}`).then(result => {
                let info = result.data[0];
                if (result.data.noCustomer) {
                    this.setState({checkEmail: '',checkPlaceHolder: 'Enter Customer Info Below'});
                    this.refs._fName.focus();
                } else {
                    this.setState({
                        // cust_id: info.cust_id,
                        address: info.address,
                        city: info.city ,
                        email: info.email,
                        fName: info.fName,
                        lName: info.lName,
                        phone: info.phone,
                        state: info.state,
                        zip: info.zip,
                    	email: info.email,
                    	address: info.address,
                    	city: info.city,
                    	ccType: info.ccType,
                    });
                };
			});
        };
    };
   
    render(){
    	return(    
            <>
            <div id = "subContainer" ref = "subContainer" hidden={true}>
            <SubmitNotice />
            </div>
        	<div className='row coContainer' id= 'coContainer' ref = "coContainer">
				<div className=' col col-xl-9 col-lg-10 '>
					<div className='row m-1 '>
						<div className = 'col text-dark'><h4 >CheckOut </h4> </div>
						<div className='form-group col-xl-4 col-lg-5 col-md-6 col-sm-8 text-primary'>
							<label htmlFor = "checkEmail "><b>Returning Customer? </b> Enter you email adress:</label>
							<div className = 'row '>
                                <input className="col form-control" 
                                    type="text" 
                                    name= "checkEmail" 
                                    value = {this.state.checkEmail}
                                    placeholder = {this.state.checkPlaceHolder}
                                    onChange = {(e) =>this.setState({checkEmail: e.target.value})}/>
								<button className = 'btz btn btn-primary col-sm-3' onClick = {this.handleEmailCheck}>check</button>
							</div>
						</div>
					</div>
					<form className = 'form' name= 'checkOutForm' ref = 'checkOutForm' onSubmit = {this.handleSubmitForm} >
						<div className="row ">
							<div className='form-group col-4'>
                            <label htmlFor = "fName">Name: </label>
                            <div className='row'>
                            <div className ='col'>
                            <input className="form-control" 
                                    type="text" 
                                    name= "fName"
                                    ref = "_fName" 
                                    value = {this.state.fName}
                                    autoFocus
                                    onChange = {(e) =>this.setState({fName: e.target.value})}
                                    required />
                            </div>
                            <div className ='col'>
                            <input className="form-control" 
                                    type="text" 
                                    name= "lName" 
                                    value = {this.state.lName}
                                    autoFocus
                                    onChange = {(e) =>this.setState({lName: e.target.value})}
                                    required />
                            </div>
                            </div>
                            
                                </div>
                            <div className='form-group col-4'><label htmlFor = "email">email: </label>
                                <input className="form-control" 
                                    type="email" 
                                    name= "email" 
                                    value = {this.state.email} 
                                    onChange = {(e) =>this.setState({email: e.target.value})}
                                    required /></div>
						</div> 
						<div className="row">
							<div className='form-group col-4'><label htmlFor = "address">Address: </label>
                                <input className="form-control" 
                                    type="text" 
                                    name= "address" 
                                    value = {this.state.address} 
                                    onChange = {(e) =>this.setState({address: e.target.value})}
                                    required /></div>
							<div className='form-group col-4'><label htmlFor = "phone">Phone#: </label>
                                <input className="form-control" 
                                    type="tel" 
                                    name= "phone" 
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    placeholder = "###-###-####"
                                    value = {this.state.phone} 
                                    onChange = {(e) =>this.setState({phone: e.target.value})} /></div>
                            <div className='form-group col-4'><label htmlFor="ccType">Credit Card Selection:</label>
                            	<select 
									name="ccType" 
									id="ccType"
									value = {this.state.ccType} 
									onChange = {(e) =>this.setState({ccType: e.target.value})}
									required >
									<option value=''>-Credit Type-</option>
									<option value="Visa">Visa</option>
									<option value="MasterCard">MasterCard</option>
									<option value="Discover">Discover</option>
									<option value="Checking">Checking</option>
                                </select></div>
                        </div> 
                        <label>City/State</label>
						<div className="row ">
							<div className='col-4'>
                            <div className='row border form-group'>
                                <div className = 'col'>
                                <input className="form-control  " 
                                    type="text" 
                                    name= "city" 
                                    value = {this.state.city} 
                                    onChange = {(e) =>this.setState({city: e.target.value})}
                                    required />
                                </div>
                                <div className = 'col'>
                                <input className="form-control  "  
                                 type="text" 
                                 name= "state" 
                                 value = {this.state.state} 
                                 onChange = {(e) =>this.setState({state: e.target.value})}
                                 required/>
                                </div>
                                <div className = 'col'>
                                <input className="form-control  "  
                                 type="text" 
                                 name= "zip" 
                                 value = {this.state.zip} 
                                 onChange = {(e) =>this.setState({zip: e.target.value})}
                                 required/>
                                </div>
                            </div>
                                </div>
							
							<div className='form-group col-4'>
                            <label htmlFor = "cardNum">Card#: </label>
                            <input className="form-control" 
                                type="number" 
                                name= "cardNum" 
                                value = {this.state.cardNum} 
                                onChange = {(e) =>this.setState({cardNum: e.target.value})}
                                required />
                              </div>
						</div> 
					<table className="table striped tableItems ">
						<thead><tr><th><h4>Selected Items</h4></th></tr></thead>
						<tbody>
							{(
                                (this.props.productSelections).length >0)&& this.props.productSelections.map((item) => <ProductCard   key={item.name} item = {item}  type = {'shopCart'}/> 
							)}
						</tbody>
						<tfoot>
							<tr><td  colSpan="3">SubTotal: $ {this.state.purchaseTotal}</td></tr>
							<tr><td colSpan="3">+Shipping: ${8}</td></tr>
							<tr><th  colSpan="3">Total: ${this.state.purchaseTotal+8}</th></tr>
						</tfoot>
					</table>
					<div className="btn-group" role="group" aria-label="Basic example" >
						<button type="button" className="btn btn-primary" id="return" onClick={this.handleButtons}>Return</button>
						<button type="button" className="btn btn-primary" id="cancel" onClick={this.handleButtons}>Cancel</button>
						<button type="submit" className="btn btn-primary" id = "submit">Submit</button>
					</div>
                    </form>
       			</div>
        	</div>
            </>
        )
	}
}
export default withRouter(CheckOut);


