import api from '../api'
const API_KEY=process.env.REACT_APP_API_KEY
function getMovies(currentPage){
  return async(dispatch)=>{
    try {
      dispatch({type:'GET_MOVIE_REQUEST'})
      const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      const topRatedUrl = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      const upComingUrl = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      const genreUrl = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      const baseUrl = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`) 
      let [popularMovies,topRatedMovies,upComingMovies,movieGenre,movieList] = await Promise.all([popularMovieApi,topRatedUrl,upComingUrl,genreUrl,baseUrl])
      
      dispatch({
        type:"GET_MOVIES_SUCCESS",
        payload:{
          popularMovies:popularMovies.data,
          topRatedMovies:topRatedMovies.data,
          upComingMovies:upComingMovies.data,
          movieGenre:movieGenre.data.genres,
          movieList:movieList.data,
          loading:false,
        }
      })
    } catch (error) {
      dispatch({type:'GET_MOVIES_FAIL'})
    }
    
  }

}
let APIkey = process.env.REACT_APP_API_KEY;
function getDetailMovie (id){
  return async(dispatch)=>{
    try{
      
        let thisUrl = api.get(`/movie/${id}?api_key=${APIkey}&language=en-US`)
        let movieReview = api.get(`/movie/${id}/reviews?api_key=${APIkey}&language=en-US&page=1`)
        let movieRecommend = api.get(`/movie/${id}/recommendations?api_key=${APIkey}&language=en-US&page=1`)
        let movieVideo = api.get(`/movie/${id}/videos?api_key=${APIkey}&language=en-US`)
        let [res,reviewRes,movieRecommendRes,movieVideoRes] = await Promise.all([thisUrl,movieReview,movieRecommend,movieVideo]);
        
        dispatch({
          type:'GET_DETAIL_MOVIE_SUCCESS',
          payload:{
            thisUrl:res.data,
            movieReview:reviewRes.data.results,
            movieRecommend:movieRecommendRes.data.results,
            movieVideo:movieVideoRes.data.results,
            detailLoding : false
          }
        })
      
  
    }catch(error){
  
    }
  }
  
}
function getMovieList (page,search){
  
  return async(dispatch)=>{
    try {
      dispatch({type:'GET_MOVIELIST_REQUEST'})
      let baseUrl = api.get(`/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`) 
      let [movieList] = await Promise.all([baseUrl])
      dispatch({
        type:'GET_MOVIE_LIST',
        payload : {
          movieList:movieList.data,
          movieListLoding:false
        }
      })

    } catch (error) {
      dispatch({type:'GET_MOVIELIST_FALE'})
    }
  }
}
export const movieAction = {
  getMovies,getDetailMovie,
  getMovieList
}