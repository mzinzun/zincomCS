import React, { useState, useEffect,useRef } from "react";
// import "./Login.css";
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
   baseURL: 'http://localhost:8000',
   withCredentials: true,
});


function Login (props) {
   const _notice = useRef();
   const [name, setName] = useState('');
   const [pw, setPw] = useState('');
   const [notice, setNotice] = useState('Enter Username and Password:');

   useEffect(()=>{
      console.log('Use effect for: Component Login Did Mount');
   },[]);

   const handleSubmission = (e) => {
    e.preventDefault();
    e.persist();
      console.log('executing login submission');
      
      const info = {
         username: name,
         password: pw
      }
      // console.log(info);

      api.post(`/login`,info).then(result =>{
      //  console.log('results of Login: ',result.data);
      
       if(result.data.username) {
        
          const user = {...result.data};
          
          delete user.password;
          console.log('results of Login: ',user); 
         props.handleUser(user);
         props.history.push('./portal');
      }
      if (result.data.noGood) {
         console.log('Invalid User: do something', result.data);
         _notice.current.classList.add('invalidNotice');
         setNotice('User information invalid: Try again')
      }

      }).catch(error=>{
            console.log('Problem with User Authen. error:');
            console.log(error);
        });
    }


    return(
        <>
            <form name = 'loginForm' className='form'>
            <h3>Employee Login: <span id = 'notice'  ref = {_notice} className = 'notice'>{notice}</span></h3>
            <label htmlFor = 'username' >Username</label><input 
            name = 'name' 
            type = 'text'
            value = {name}
            onChange = {(e) => setName(e.target.value)} />  
            <label htmlFor = 'password' >Password</label>
            <input 
            name='password' 
            type = 'password' 
            value = {pw}
            onChange = {(e)=> setPw(e.target.value)} /><br/>
            <button type = 'submit' onClick = {handleSubmission}>Log In</button>
            </form>
            
      </>
   )
}
export default withRouter(Login);