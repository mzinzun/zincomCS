import React, {Component} from'react';
import ProductCard from '../ProductCard';
import {withRouter, Link} from 'react-router-dom';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        // this.state = {subTotal: 0}
    };
componentDidMount(){
    console.log('component ShoppingCart did Mount')
    console.log('data for total', this.props.itemsList)
    // this.setState({subTotal: this.props.subTotal})
}  
componentDidUpdatet(prevProps,prevStates){
    console.log('component ShoppingCart did Update')
    // this.setState({subTotal: this.props.subTotal})
}  
checkOut = ()=> {
    ((this.props.itemsList).length>0)&&this.props.history.push('/CheckOut');
    // ((this.props.itemsList).length>0)&&this.props.handleCheckOut([...this.props.itemsList]);
}
clearProductSelections = ()=> {
    this.props.handleProductSelections([]);
}
    render(){
        return(
                <table className = "table cart">
                <thead>
                    <tr><th colSpan="4">Shopping Cart: Selected Items for Purchase</th></tr>
                    {((this.props.itemsList).length >0)&&<tr><th>Qty</th><th>Item</th><th>Description</th><th>Cost</th></tr> }
                </thead>
                <tbody>
                    {((this.props.itemsList).length >0)&& this.props.itemsList.map((item) => <ProductCard   key={item.name} item = {item}  type = {'shopCart'}/> )}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" >SubTotal:</th>
                        <td>${this.props.subTotal}</td>
                        <td ><button className = "btn btn-dark" onClick = {this.checkOut}><i className="shop icon"></i>Checkout</button></td>
                        <td ><Link to ='./home' className = "btn btn-dark" ><i className="trash icon"></i>Cancel</Link></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
};

export default withRouter(ShoppingCart);