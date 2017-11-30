import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import AllBooks from './allbooks';
import TagBooks from './tags';

class Books extends Component {
    constructor(props){
        super(props);
        var booksfetched=false;
        var tagsfetched=false
    }
    componentWillMount(){
        console.log('boooks proops',this.props);
        
        const root='http://127.0.0.1:8000';
        var that=this;
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
    
    handleTagsClick(){
        if(this.props.location.pathname=='/books')
            return <AllBooks/>
        else 
            var path=this.props.location.pathname.slice(12,this.props.location.pathname.length);
            return <TagBooks tag={path}/>
    }
    SearchSubmit=(event)=>{
        event.preventDefault();
        var searchedWord=event.target.search.value;
        this.props.SearchedBook(searchedWord);
        this.props.IsBooksFetched(false);
    }
    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul className='nav'>
                            <div onClick={()=>{this.props.ChangeTag('');this.props.IsBooksFetched(false);this.props.SearchedBook('');}}><NavLink to='/books/' exact>AllBooks</NavLink></div>
                            {
                                this.props.tags.map(tag=>(<div key={tag.tags} onClick={()=>{this.props.ChangeTag(tag.tags);this.props.IsBooksFetched(false);this.props.SearchedBook('');}}>
                                    <NavLink to={{
                                        pathname:'/books/tags/'+tag.tags,
                                        }} key={tag.tags}  exact>{tag.tags}</NavLink></div>
                                ))
                            }
                            <form onSubmit={this.SearchSubmit}>
                            <input name='search' placeholder='Search' type='text'/>
                            </form>
                        </ul>
                    </nav>
                </header>
                <AllBooks/>
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
        ChangeTag:(tag)=>dispatch({type:'CHANGETAG',data:tag}),
        GetBooks:(books)=>dispatch({type:'BOOKSFETCHED',data:books}),
        GetTags:(tag)=>dispatch({type:'TAGSFETCHED',data:tag}),
        fetchingData:()=>dispatch({type:'FETCHINGDATA'}),
        fetchingDataFinished:()=>dispatch({type:'FETCHINGDATAFINISHED'})
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Books);
  
