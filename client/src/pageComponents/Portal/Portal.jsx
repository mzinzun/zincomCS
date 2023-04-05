import React, { useState, useEffect} from "react";
import "./Portal.css";
import {withRouter} from 'react-router-dom';
import CustomerForm from './CustomerForm';
import ProductsForm from './ProductsForm';
import EmployeesForm from './EmployeesForm';
import CommentsForm from './CommentsForm';
import PurchForm from './PurchForm';
import axios from 'axios';
const api = axios.create({
   baseURL: 'http://localhost:8000',
   withCredentials: true
});

function Portal (props) {
    const [viewSelection, setViewSelection] = useState('none'); // for Table View Button Seleceted
    const[tableData, setTableData] = useState([]);
    useEffect(()=>{
        console.log('Use effect for: Component Portal Did Mount');
         // Check for existing user login
        api.get('/profile').then( (result)=>{
            console.log(result.data, props);
            (result.data.noUser)&&props.history.push('/login');
        }).catch (err => {
            console.log('There was error with the network request: ',err);
        });
     },[]);
     
     // get data to display in form Components and as table
     const selectTableView = function (e) {
        console.log('button pushed: ', e.target.id);
        setViewSelection(e.target.id);
        var list = document.getElementsByClassName('portalBtn');
        console.log('list: ',list);
        for(let i=0; i<list.length;i++) {
            list[i].classList.remove('btnActive');
        }
        console.log('list: ',list);
       e.target.classList.add('btnActive');
     }
    return(
        <div className='portalPage'>
            <div>
                <h1> {props.user.f_name}! Welcome to the Portal Page!</h1>
            </div>
            <div className ='row '>
                 {/* Column One */}
                <div className='col-lg-2 portalMenu'>
                    <div className='row '>
                        <h4>Tables</h4>
                        <div className='d-inline-flex flex-lg-column portalNav p-3 m-1' onClick={selectTableView}>
                            <button className = '  portalBtn ' type='button'  id= 'employees' >Employees</button>
                            <button className = '  portalBtn' type='button'  id= 'customers'>Customers</button>
                            <button className = ' portalBtn' type='button'  id= 'products'>Products</button>
                            <button className = ' portalBtn '  type='button'  id= 'comments'>Comments</button>
                        </div>
                    </div>
                </div>
                <PortalForms   viewSelection ={viewSelection}  />
        </div>  
        </div>  
   )
}

export default withRouter(Portal);

function PortalForms (props) {
    switch (props.viewSelection) {
        case('employees'): return <EmployeesForm />
        case('customers'): return <CustomerForm />
        case('products'): return <ProductsForm />
        case('purchases'): return <PurchForm />
        case('comments'): return <CommentsForm />
     default: return (<div className =' defaultView col-5'><h3>Please Select Data to View</h3></div>)
   }
}
