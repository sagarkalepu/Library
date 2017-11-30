import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { Route } from 'react-router-dom'

const root='http://127.0.0.1:8000'
class User extends Component {
    componentDidMount(){
        console.log('User',this.props)
    }
    
    onSubmitHandle=(event)=>{
        var that=this;
        event.preventDefault();
        this.props.fetchingData();
        var id=event.target.user.value;
        this.props.userIdEntered(id);
        axios.get(
            root+'/accounts/'+ id/*,{
            headers: {"Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json'},}*/
        )
        .then(function (response) {
            that.props.fetchingDataFinished();
            that.props.userVerified();
            that.props.userDetails(response.data)
    
        })
        .catch(function (error) {
          console.log(error);
    //       this.props.fetchingDataFinished();
    //      this.props.errorOccured();
        });
      }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandle} >
                    <input type='text' name='user' placeholder='Your ID'/>
                </form>
                <ul>
                {
                   this.props.UserData.map(user=>{
                       return(
                       <li key={user.bookid}>Book ID:{user.bookid}<br/>Title:{user.book.title}<br/>Authur:{user.book.author}<br/>Taken on:{user.data}</li>)
                   })
                }
                </ul>
            </div>
        )
    }
}


var mapStateToProps= state=>{
    return{
      UserData:state.UserData
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(User);
  