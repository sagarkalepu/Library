import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
 

class AllBooks extends Component {
    constructor(props){
        super(props);
        var booksfetched=false;
        var tagsfetched=false
    }
    componentWillMount(){
        console.log(this.props)
        this.allbooks();
    }
    componentDidUpdate(){
        this.allbooks();
    }
    allbooks(){
        var that=this;
        const root='http://127.0.0.1:8000';
        if(this.props.user && !this.props.isbooksfetched){
            this.props.fetchingData();
            if(this.props.currenttag==''){
                axios.get(root+'/books/'+this.props.search)
                .then(function (response) {
                    that.props.fetchingDataFinished();
                    that.props.GetBooks(response.data);
                    that.props.IsBooksFetched(true); 
                    console.log('Rannnnnnn');
                })
                .catch(function (error) {
                console.log(error);
                that.props.fetchingDataFinished();
                });
            }
            else{
                axios.get(root+'/books/tags/'+this.props.currenttag)
                .then(function (response) {
                    that.props.fetchingDataFinished();
                    that.props.GetBooks(response.data);
                    that.props.IsBooksFetched(true); 
                    console.log('Rannnnnnn');
                })
                .catch(function (error) {
                console.log(error);
                that.props.fetchingDataFinished();
                });
            }
            this.props.fetchingData();
            axios.get(root+'/books/tags/')
            .then(function (response) {
                that.props.fetchingDataFinished();
                that.props.GetTags(response.data);/////////////////////////////////////////////////////////////
                that.tagsfetched=true;/////////////////////////////////////////////////////////////////////////           
            })
            .catch(function (error) {
              console.log(error);
               that.props.fetchingDataFinished();
            });            
        }
        return ;
    }
    render() {
        return (
            <div>
                <ul>{
                    this.props.booksDetails.map(book=><li key={book.id}>
                        Book Title:{book.title}<br/>Author:{book.title}<br/>Categoery:{book.tag.map(tag=><p key={tag.tags}>{tag.tags}</p>)}Remaining:{book.remaining_books} </li>)
                }
                </ul>
            </div>
        )
    }
}

var mapStateToProps= state=>{
    return{
      user:state.UserVerified,
      loading:state.loading,
      booksDetails:state.AllBooks,
      tags:state.Tags,
      currenttag:state.CurrentTag,
      isbooksfetched:state.IsBooksFetched,
      search:state.Search,
      
    };
  };
  
  var mapDispatchToProps=dispatch=>{
    return{
        SearchedBook:(search)=>dispatch({type:'BOOKSEARCHED',data:search}),        
        IsBooksFetched:(data)=>dispatch({type:'ISBOOKSFETCHED',data:data}),
        GetBooks:(books)=>dispatch({type:'BOOKSFETCHED',data:books}),
        GetTags:(tags)=>dispatch({type:'TAGSFETCHED',data:tags}),
        fetchingData:()=>dispatch({type:'FETCHINGDATA'}),
        fetchingDataFinished:()=>dispatch({type:'FETCHINGDATAFINISHED'})
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(AllBooks);
  
