let initialState = {
  movieListLoding:true,
  movieList:{
    page:1,
    results:[]
  }
}

function movieListReducer(state=initialState, action){
  let {type,payload} = action
  switch (type) {
    case 'GET_MOVIELIST_REQUEST' : 
    return{
      ...state,
      movieListLoding:true
    }
    case 'GET_MOVIE_LIST':
      return{
        ...state,
        movieList : payload.movieList,
        movieListLoding:false
      }
      
      break;
    case 'GET_MOVIELIST_FALE':
    return{
      ...state,
      movieListLoding:false
    }
    default: return {...state}
      break;
  }
}

export default movieListReducer