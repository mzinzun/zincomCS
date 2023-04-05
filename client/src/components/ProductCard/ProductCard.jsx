import React, {Component} from 'react';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            buyBox: false,
            itemId: '',
            hide: false
        }
    }
    componentDidMount (){
        console.log('ProductCard did Mount');
       
        this.setChecked();
        (this.props.type === 'shopCart')&& this.setState({hide:true});
    };
    setChecked =  (e)=> {
        if (!e) {
            this.props.item.qty && this.setState({qty: this.props.item.qty, buyBox: true});
        } else {
            this.setState({buyBox: e.currentTarget.checked,itemId: e.currentTarget.name}, ()=>{
                const qty = this.state.qty;
                const buyBox = this.state.buyBox;
                const itemId = this.state.itemId;
                this.props.handleSelections(qty,itemId,buyBox);
            });
        }
    }
    handleQuantity = (e) =>{
        this.setState({qty: e.currentTarget.value}, ()=>{
            const qty = this.state.qty;
            const buyBox = this.state.buyBox;
            const itemId = this.state.itemId;
            this.props.handleSelections(qty,itemId,buyBox);
        });
    }
    render(){
        return (
            <tr id = {this.props.item.prod_id}>
                <td className="" hidden = {this.state.hide}>
                    <input type="number" 
                    name={this.props.item.sku} 
                    min="1" max="50"
                    value = {this.state.qty} 
                    hidden = {this.state.hide}
                    onChange = { this.handleQuantity } /></td>
            	<td hidden = {!(this.state.hide)} >{this.props.item.qty}</td>
                <td>{this.props.item.sku}</td>
				<td>{this.props.item.name}</td>
				<td hidden = {this.state.hide}>{this.props.item.descrip}</td>
				<td>${this.props.item.price}</td>
                <td className="" hidden = {this.state.hide}>
					<input 
					hidden = {this.state.hide}
					name={this.props.item.prod_id} 
					type="checkbox" 
					checked = {this.state.buyBox} 
					onChange = {this.setChecked}/></td>
            </tr>)
    }
}
export default ProductCard;
