import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
});

class PurchaseHistory extends Component{
    constructor(props) {
		super(props);
		this.state = ({
			details: [],
			custInfo: {},
			detailsTotal: 0,
			purchItemsDetails: [],
			purchDetailsTot: 0,
			purchDate: ''
		});
	}
	componentDidMount() {
		console.log('PurchaseHistory Component Did Update');
		
		// get customer information to show in Shipping address
		const custEmail = this.props.data[0].cust_email;
		api.get(`/getCustomerByEmail/${custEmail}`).then(result=>{
			const info = {
				name: result.data[0].fName + ' ' +result.data[0].lName,
				add1: result.data[0].address,
				add2: result.data[0].city + ', '+result.data[0].state+'  '+result.data[0].zip
			}
			this.setState({custInfo: info});
		}).then(()=>console.log(this.state.custInfo));
	}
	
	// get this details of  the purchases products from purchase.items list in database
	handlePurchaseDetails = (e)=>{
		
		const currentDate = e.target.attributes[1].value;
		this.setState({purchDate: currentDate});
		let dataRow = e.target.id;
		let items = JSON.parse(this.props.data[dataRow].items);
		const skuItems =items.map(item=>item.sku);
		api.post('/getProductBySKUmulti', skuItems).then(result=>{
			const details = result.data.length === 1?result.data[0]:(result.data).map(item => item[0])
			return details;
		}).then ((result)=> {
			console.log('e.target.data-loc', this.state.purchDate);
			if (result.length>1) {
					const addQty = result.map((item)=> {
					let qtyItem = items.filter(a => a.sku === item.sku);
					let newItem = {...item,qty: qtyItem[0].qty};
					return newItem
				});
				this.setState({purchItemsDetails: addQty});
				this.setState({ purchDetailsTot: ( addQty.reduce((acc,item)=>acc+(item.qty*item.price),0) ) });
			} else {
				let addQty = [{...result,qty:items[0].qty}];
				this.setState({purchItemsDetails: addQty});
				this.setState({purchDetailsTot: (addQty[0].price*addQty[0].qty)});
			}
		}).then(()=>{
			this.state.purchItemsDetails.map((item,idx)=>{
				console.log('item is: ', item.sku);
				return item
			});
		});
	}
  render(){
    return(
        <div className ='row '>
            <aside className='col-4 border'>
				<h4>List of Purchases</h4>
				<ul className='hist-ul '>
					<li className = 'row justify-content-start border'>
						<div className='col-3 '>Date</div>
						<div className='col-2 '>Total</div>
						<div className='col-3'>Payment</div>
						<div  className='col-3'>Details</div>
					</li>
					{this.props.data.map((item,idx)=> 
						<li key ={idx} className = 'row justify-content-start liFont'>
							<div className='col-3 '>{item.purchDate}</div>
							<div className='col-2 ' >${item.purchTotal}</div>
							<div className='col-3'>{item.ccType}</div>
							<div  className='col-3'>
								<button id={idx} 
								data-loc = {item.purchDate}
								className='btn btn-secondary detail-btn' 
								type='button' 
								onClick={this.handlePurchaseDetails}>Details</button></div>
						</li>
					)}
                </ul>
				<div className='text-end'><Link to ='/home' className='btn btn-dark hist-btn'><i className="close icon"></i>Done</Link></div>
            </aside>
            <section className='col-8 border printVer'>
				<div className='row detail-header align-items-start'>
					<div className="col-5">
						<h4>Zincom Computer Solutions:</h4>
						<p>1 Main St. Suite 5H</p>
						<p>San Quientin, Ca. 94974</p>
						<p><b>Purchase Date: {this.state.purchDate}</b></p>
					</div>
					<div  className="col-2"></div>
					<div className="col-5">
						<h4>Shipping Address:</h4>
						<p>{this.state.custInfo.name}</p>
						<p>{this.state.custInfo.add1}</p>
						<p>{this.state.custInfo.add2}</p>
					</div>
				</div>
            	<div className='row align-items-start'>
				<div className="col">
				<table className = 'table table-stripe'>
						<thead>
							<tr>
								<th>Item</th>
								<th>Qty</th>
								<th>Name</th>
								<th>Price</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody className='details'>
							{(this.state.purchItemsDetails.length>0)&&(this.state.purchItemsDetails).map((item,idx)=> 
								<tr key={idx}>
									<td>{item.sku}</td>
									<td>{item.qty}</td>
									<td>{item.name}</td>
									<td>${item.price}</td>
									<td>${item.price*item.qty}</td>
								</tr>
							
							)}
						</tbody>
						<tfoot>
							<tr>
								<th scope= 'row'>Purchase SubTotal:</th>
								<td>${this.state.purchDetailsTot}</td>
							</tr>
							<tr>
								<th scope= 'row'>incl. Shipping($8.00): Total</th>
							<td>${this.state.purchDetailsTot+8}</td>
							</tr>
							
						</tfoot>
                	</table>
				</div>
            	</div>
				<div className='text-center'>
					<button className = "btn btn-dark hist-btn" onClick={window.print} ><i className="print icon"></i>Print</button>
				</div>
            </section>
        </div>
        )
    }
};

export default PurchaseHistory;


