import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render(){
        return(
             <footer >
                 <div className = "row justify-content-between">
                    <p className="col-6">
                    <Link to = '/portal' >Zincom </Link>Computer Solutions &copy; 2021: developed by Michael Zinzun</p>
                    <div className = "col-6 text-end noPrint">
                        <button className="ui facebook button ">
                            <i className="facebook icon"></i>Facebook
                        </button>
                        <button className="ui twitter button ">
                            <i className="twitter icon"></i>Twitter
                        </button>
                    </div>
                </div>
           </footer>
        )
    }
}

export default Footer