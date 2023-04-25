import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Products.css';
import {Catagories,ShoppingCart,ProductsList,PurchaseHistory} from "../../components/components"

// use axios module for http requests
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

class Products extends Component {
    constructor (props) {
        super(props)
        this.state = {
          catagory: ['No Catagories'], // for displaying list of catagories( from database) to choose from
          productsList: [], // for maintaining list of Products by catagory selected from this.state.productCatagory
          productCatagory: 'Cases', // selected catagory to display
          buyTotal: 0, //keep track of purchase total
          historyEmail: '', // for history email input field
          historyData: [], // for history of cutomer purchase
          showHistory: false, // flag for alternate render to show History
          detailItems: [], // for purchase details of purchase items from this.state.historyData
          holder: 'Enter valid Email'
        }
    };
    componentDidMount(){
        console.log('component Product did Mount') 
        // recalculate subtotal from productSelections list and set -buyTotal
        const subtotal = (this.props.productSelections).reduce((acc,item) =>acc+(item.price*item.qty),0);
        console.log('new subtotal is: ', subtotal)
        this.setState({buyTotal: subtotal});
        // Get list of existing Catagories
        if (!this.state.showHistory) {
            api.get('/catagoryList').then((response) => {
                const data = (response.data).map((item)=>item.catagory)
                this.setState({catagory: data});
            })
            .catch(error=>{
                console.log('Problem with catagoryList. error:');
                console.log(error);
            });
            this.getProductsList (); 
        }
    };
    // function to set css for catagory <li> displayed 
    setActiveLi = (e) => {
        var liList = document.getElementsByTagName('li');
        for (let i = 0;i < liList.length;i++) {
            liList[i].classList.contains('active')&&liList[i].classList.remove('active');
        }
        if (e) {
            e.target.classList.add('active');
        } else  {
            for (let i = 0;i < liList.length;i++) {
                if (liList[i].attributes.name.nodeValue === 'Cases') {
                    liList[i].classList.add('active');
                };
            }
        };
    };
    // function to retrieve and display products List by selected Catagory
    getProductsList = (e) => {
        var cat;
        //  check for initial Products catagory List load from ProductDidMount
        if (!e) {
            cat = "Cases";
        } else {
            cat = (e.target.attributes.name.value).trim();
        }
        // set products list to display based on selected catagory - default is cases
        api.get(`/getProductsByCatagory/${cat}`).then(response => {
            const data = response.data;
            let selList = [...this.props.productSelections];
            var  usedData = data.map(item => {
               selList.forEach(obj => (obj.prod_id  === item.prod_id)&&(item = {...item, qty: obj.qty }));
                return item});
            this.setState({productsList: usedData, productCatagory: data[0].catagory});
            return this.state.productsList;
        }).then (resp => this.setActiveLi (e))
        .catch(error=>{
            console.log('Problem with ProductsByCatagory. error:');
            console.log(error);
        });
    };
    // function to manage products selected for purchase
    handleSelections = (qty,itemId,buyBox)=> {
        var subTotal = 0;
        if (buyBox) {
            // test that item does not already exist in product Selections list
            if ( !( (this.props.productSelections).some(item => item.prod_id === Number(itemId)) ) ) {
                const productsList = [...this.state.productsList];
                let itemToAdd = productsList.find(item=> item.prod_id === Number(itemId));
                itemToAdd.qty = qty; 
                const selectionsList = [...this.props.productSelections, itemToAdd];
                subTotal = selectionsList.reduce( ((acc,item)=>acc +(item.price*item.qty)) ,0);
                this.props.handleProductSelections (selectionsList);
                this.setState({productsSelections: selectionsList,buyTotal: subTotal})
            } else {
                // condition if item exists in Shopping cart needs to change ** Qty is change in item
                let newList = [...this.props.productSelections];
                newList = newList.map(item => {
                    if (item.prod_id === Number(itemId)) {
                        item.qty = qty;
                        return item;
                    }
                    return item;
                });
                subTotal = newList.reduce( ((acc,item)=>acc +(item.price*item.qty)) ,0);
                this.setState({productsSelections: newList,buyTotal: subTotal})
            }
        }
        if (!buyBox) {
            console.log('Box unchecked')
            console.log('New List to display')
            let itemsList = [...this.props.productSelections];
            let updateList = itemsList.filter(item => item.prod_id !== Number(itemId));
            this.props.handleProductSelections (updateList)


            subTotal = updateList.reduce( ((acc,item)=>acc +(item.price*item.qty)) ,0);
            this.setState({buyTotal: subTotal})
        }
    };
    // function to store shopping list to Local Storage ******* Check for useage *********************
    handleCheckOut =  (shoppingList)=> {
    //     let stringList = JSON.stringify(shoppingList)
    //    await localStorage.setItem('holdItems', stringList);
        this.props.history.push('/CheckOut');
    };
    // function to display PurchaseHistory page
    showHistory = (data)=> {
      this.setState({historyData: data,showHistory: true});
    };
    // function to update historyEmail state
    handleHistoryEmail = (e)=>{
        this.setState({historyEmail: e.target.value});
    };
    // function to get purchase history data
    handleHistoryData =()=>{
        console.log('starting handleHistoryData');
        const email = this.state.historyEmail;
        if (email !== '') {
            api.get(`getCustomerPurchases/${email}`).then((response)=>{
                const data= response.data;
                console.log('data response',data)
                if (data.noPurchases) {
                    console.log('email not on record');
                    this.setState({historyEmail: ''})

                } else {
                    //convert items list from sql dbase from string to array
                var newData = data.map(purchase =>{
                    let purchItems = JSON.parse(purchase.items)
                    let purchTotal = purchItems.reduce((acc,item)=> acc+(item.price*item.qty),0);
                    purchase.purchTotal = purchTotal;
                    return purchase;
                });
                data.length>0&&this.showHistory(newData);
                }
                return data;
            })
            .catch(error=>{
                console.log('Problem with CustomerPurchase. error:');
                console.log(error);
            });
        }
    }
     // function to get purchase history item details
    showPurchaseDetails = (e)=>{
        var arr =[];
        const idx=e.target.id;
        const items = [...this.state.historyData.purchases[idx].items];
        items.forEach(item => 
            {   
                    const sku = (item.sku).trim();
                    api.get(`/getProductBySKU/${sku}`)
                    .then(result => {
                        const items = result.data;
                        const qtyItem = {...items,qty: item.qty} 
                        arr.push(qtyItem);
                        this.setState({detailItems: arr});
                    })
                    .catch(error=>{
                        console.log('Problem with ProductsBySKU. error:');
                        console.log(error);
                    });
            });
    return arr
    }
    render(){
         if ((this.state.showHistory)) {
			return( <PurchaseHistory 
				data = {this.state.historyData} 
                showPurchaseDetails = {this.showPurchaseDetails}
                details = {this.state.detailItems}
               />)
         }
            return(
                <main className='productContainer'>
                    <div className= "catSection text-center subHeading">
                    <h3 >Select products to add to cart</h3>
                    <h4>View Purchase History? Enter email address</h4>
                    <input 
                    type='email' 
                    name='email' 
                    value = {this.state.historyEmail}
                    placeholder = {this.state.holder}
                    onChange={(e)=>this.setState({historyEmail: e.target.value})}
                    />
                    <button type='button' onClick={this.handleHistoryData}>Get History</button>
                    <Catagories getProductsList = {this.getProductsList} cats = {this.state.catagory}/>
                    </div>
                    <div className="row ">
                        <section className =  "col-lg-8 prodSection"><ProductsList 
                        handleSelections = {this.handleSelections} 
                        productsList={this.state.productsList} 
                        cat = {this.state.productCatagory} 
                        productSelections = {this.props.productSelections} 
                        handleProductSelection = {this.props.handleProductSelection}
                        /></section>
                        <aside className =  "col-lg-4 shopSection "><ShoppingCart 
                        itemsList ={this.props.productSelections} 
                        subTotal = {this.state.buyTotal} 
                        // handleCheckOut={this.handleCheckOut}
                        handleProductSelections = {this.props.handleProductSelections}
                        /></aside>
                    </div>
                </main>
            )
    }
}

export default withRouter(Products);