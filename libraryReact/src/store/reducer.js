
var initialstate={
    UserId:'',
    UserData:[],
    loading:false,
    UserVerified:false,
    AllBooks:[],
    Tags:[],
    CurrentTag:'',
    IsBooksFetched:false,
    Search:''

}


const reducer = (state =initialstate , action) => {
    switch (action.type) {
        case 'BOOKSEARCHED':
            return{
                ...state,
                Search:action.data
            }
        case 'USERIDENTERED':
            return{
                ...state,
                UserId:action.id
            }
        case 'USERVERIFIED':
            return{
                ...state,
                UserVerified:true
            }

        case 'FETCHINGDATA':
            return{
                ...state,
                loading:true
            }
        case 'FETCHINGDATAFINISHED':
            return{
                ...state,
                loading:false
            }
        case 'TAGSFETCHED':
            return{
                ...state,
                Tags:action.data
            }
        case 'USERDETAILS':
            return{
                ...state,
                UserData:action.details
            }
        case 'BOOKSFETCHED':
            return{
                ...state,
                AllBooks:action.data,
            }
        case 'CHANGETAG':
            console.log('reducer',action.data);
            return{
                ...state,
                CurrentTag:action.data,
            }
        case 'ISBOOKSFETCHED':
            return{
                ...state,
                IsBooksFetched:action.data
            }
        
        default:
            return state;
    }
}


export default reducer;