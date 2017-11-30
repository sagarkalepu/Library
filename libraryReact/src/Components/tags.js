import React,{Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router'

class TagBooks extends Component{
    constructor(props){
        super(props);
        console.log('taaaaaaaaaaaaaaaaaag',props);
        var tag=this.props.location.pathname.slice(12,this.props.location.pathname.length);
    }

    componentDidMount(){
        console.log('tagss',this.props);
        this.tag=this.props.location.pathname.slice(12,this.props.location.pathname.length);  
        this.tagbooks()
    }
    tagbooks(){
        
        const root='http://127.0.0.1:8000/books/tags/'+this.tag;
        console.log(root);
        var that=this;
        axios.get(root)
        .then(function (response) {
            that.props.fetchingDataFinished();
            that.props.GetBooks(response.data);  
            console.log('sagar',that.props.booksDetails,response);        
        })
        .catch(function (error) {
          console.log(error);
           that.props.fetchingDataFinished();
        })
        return <h1>hello</h1>
    }


    render(){
        return(
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    loading:state.loading,
    booksDetails:state.AllBooks,
    tags:state.Tags
})

const mapDispatchToProps = dispatch=>{
    return{
    GetBooks:(books)=>dispatch({type:'BOOKSFETCHED',data:books}),
    GetTags:(tags)=>dispatch({type:'TAGSFETCHED',data:tags}),
    fetchingData:()=>dispatch({type:'FETCHINGDATA'}),
    fetchingDataFinished:()=>dispatch({type:'FETCHINGDATAFINISHED'})
}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagBooks))
