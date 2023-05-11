import React, {Component} from 'react';
import {Header, Footer} from "../../components/components"
import {Home,Products,CheckOut,AboutUs,ContactUs,Login,Portal} from "../pages"
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// use axios module for http requests
import axios from 'axios';
const api = axios.create({
   baseURL: 'http://localhost:8000',
   withCredentials: true
});

// configure react component
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            productSelections:  [],
            hideNav: true,
            userLoggedIn:{}
        }
    }
    componentDidMount(){
        console.log('Component "App" did Mount');
        api.get('/profile').then( (result)=>{
            console.log('result: ',result.data);
            !result.data.noUser&&this.setState({
              userLoggedIn: result.data,
              hideNav:false
          });
        }).catch (err => {
            console.log('There was error with the network request: ',err);
        });
    }
    // manage state for list of products selected from products page to be used in other pages
    handleProductSelections = (newValue)=> {
        this.setState({productSelections: newValue});
    }
   
    // perform logout duties to logout user
    handleLogOut = ()=> {
        api.get('/logout').then(result => {
            this.setState({hideNav: true});
            console.log(result.data.goHome);
        // (result.data.goHome === true)&&props.history.push('/')
        });
    }

    // manage state for user logged in
    handleUserLoggedIn = (user)=>{
        console.log('executing HandleUserLoggedIn:')
        this.setState({
            userLoggedIn: user,
            hideNav: false
        })
    }
    // render React components 
    render(){
        return(
            <Router>
                <Header /> 
                <div className ='appContainer'>
                <nav >
                    <Link to = '/home' ><button type="button" className="btn btn-dark">Home</button></Link>
                    <Link to = '/products' ><button type="button" className="btn btn-dark">Products</button></Link>
                    <Link to = '/contact' ><button type="button" className="btn btn-dark">Contact us</button></Link>
                    <Link to = '/about' ><button type="button" className="btn btn-dark">About Us</button></Link>
                    <Link to = '/portal' ><button hidden = {this.state.hideNav} type="button" className="btn btn-dark">Portal</button></Link>
                    <Link to = '/' ><button hidden = {this.state.hideNav} type="button" className="btn btn-dark" onClick = {this.handleLogOut}>Log Out</button></Link>
                </nav>
                <main>
                        <Switch>
                            <Route exact path="/" >
                                <Home handleProductSelections = {this.handleProductSelections}/>
                            </Route>
                            <Route exact path="/home" >
                                <Home handleProductSelections = {this.handleProductSelections}/>
                            </Route>
                            <Route exact path="/products" >
                                <Products productSelections = {this.state.productSelections} 
                                    handleProductSelections = {this.handleProductSelections} />
                            </Route>
                            <Route exact path="/about" >
                                <AboutUs />
                            </Route>
                            <Route exact path="/contact" >
                                <ContactUs   />
                            </Route>
                            <Route exact path = "/checkout" >
                                <CheckOut productSelections = {this.state.productSelections} handleProductSelections = {this.handleProductSelections}/>
                            </Route>
                            <Route exact path = "/login" >
                                <Login   handleUser = {this.handleUserLoggedIn} user = {this.state.userLoggedIn}/>
                            </Route>
                            <Route exact path = "/portal" >
                                <Portal user = {this.state.userLoggedIn} handleLogIn= {this.handleUserLoggedIn}/>
                            </Route>
                            <Route path="/*" component = {NotFound} />
                        </Switch> 
                </main>
                </div>
                <Footer />
            </Router>
        )
    }
}

export default App;

//  configure React componet for File Not Found
class NotFound extends Component {

    render(){
        return(
            <>
                <h1>404 : Page Not Found!</h1>
            </>
        )
    }
}