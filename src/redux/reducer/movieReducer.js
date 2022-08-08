let initialState = {
  popularMovies:{},
  topRatedMovies:{},
  upComingMovies:{},
  movieGenre:[],
  loading:true,
}


function movieReducer(state=initialState,action) {
  let {type,payload} = action
  switch(type){
    case 'GET_MOVIE_REQUEST':
      return{...state,loading:true}
    case 'GET_MOVIES_SUCCESS':
      return{
        ...state,
        popularMovies:payload.popularMovies,
        topRatedMovies:payload.topRatedMovies,
        upComingMovies:payload.upComingMovies,
        movieGenre:payload.movieGenre,
        loading:false
      }
    case 'GET_MOVIES_FAIL':
      return{
        ...state,
        loding:false
      }
    default : return {...state}
  }
}

export default movieReducer