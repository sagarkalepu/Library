import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import User from './Components/User';
import Books from './Components/books';
import TagBooks from './Components/tags';
import { BrowserRouter, Route ,Link, NavLink} from 'react-router-dom';


class App extends Component{

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <nav>
              <ul class='nav'>
                <li ><NavLink to='/' exact >home</NavLink></li>
                <li ><NavLink to='/books'>books</NavLink></li>
              </ul>
            </nav>
          </header>
          
          <Route  path='/' exact component={User} />
          <Route path='/books'  component={Books}/>
        </div>  
      </BrowserRouter>
    );
  }
}

var mapStateToProps= state=>{
  return{
    
  };
};

var mapDispatchToProps=dispatch=>{
  return{
    fetchingData:()=>dispatch({type:'FETCHINGDATA'}),
    fetchingDataFinished:()=>dispatch({type:'FETCHINGDATAFINISHED'}),
    userDetails:(details)=>dispatch({type:'USERDETAILS',details:details}),
    userIdEntered:(id)=>dispatch({type:'USERIDENTERED'}),
    userVerified:()=>dispatch({type:'USERVERIFIED'})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

