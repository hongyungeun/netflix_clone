const initialState = {
  popularMovies:{ },
  topRatedMovies:{},
  upComingMovies:{},
  movieGenre:[],
  loading:true,
  thisUrl:{},
  movieReview:[],
  movieRecommend:[],
  movieVideo:[],
  detailLoding:true,
  movieList:{
    page:1,
    results:[]
  }

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
        movieList:payload.movieList,
        loading:false
      }
    case 'GET_MOVIES_FAIL':
      return{
        ...state,
        loding:false,
        
      }
    case 'GET_DETAIL_MOVIE_SUCCESS':
      return{
        ...state,
        thisUrl: payload.thisUrl,
        movieReview:payload.movieReview,
        movieRecommend:payload.movieRecommend,
        movieVideo:payload.movieVideo,
        detailLoding:false
      }
    case 'GET_DETAIL_MOVIE_FALE' :
      return{
        ...state,
        detailLoding:false
      }
    case 'GET_MOVIE_LIST':
    return{
      ...state,
      movieList:payload.movieList
    }
    
    default : return {...state}
  }
}


export default movieReducer