import React, {Component} from 'react';
import ProductCard from '../ProductCard';

class ProductsList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            catagory: '',
        }
    }
    componentDidMount(){
     
    } 
    componentDidUpdatet(){
      
    }
    render(){
        return(
            <table className = "table table-striped prodsList" id = 'catTable'>
                <thead>
                    <tr><th colSpan="6">catagory: {this.props.cat} </th></tr>
                    <tr><td>Qty</td><td>part #</td><td>Name</td><td>Description</td><td>Price</td><td>buy</td></tr>
                </thead>
                <tbody>
                {this.props.productsList.map((item) => <ProductCard   key={item.name} item = {item} handleSelections = {this.props.handleSelections} type = {'prodList'}/> )}
                </tbody>
            </table>
        )
    }
}

export default ProductsList