import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <header >
                <div className= "row">
                    <div className= "col-2 col-md-3">  <Link to = "/" className="logo"> <h1 >Z</h1><h3>INCOM</h3></Link></div>
                    <div  className= "col-10 col-md-6 p-4 p-md-1"className = "zTitle"><h1 >Zincom Computer Solutions</h1></div>
                    <div  className= "col-md-3 text-center p-4" className= "zTitle"></div>
                </div>
            </header>
        )
    }
}
export default withRouter(Header);