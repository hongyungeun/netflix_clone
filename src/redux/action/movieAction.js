import api from '../api'
const API_KEY=process.env.REACT_APP_API_KEY
function getMovies(){
  return async(dispatch)=>{
    try {
      dispatch({type:'GET_MOVIE_REQUEST'})
      const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      const topRatedUrl = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      const upComingUrl = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      const genreUrl = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      let [popularMovies,topRatedMovies,upComingMovies,movieGenre] = await Promise.all([popularMovieApi,topRatedUrl,upComingUrl,genreUrl])
      
      dispatch({
        type:"GET_MOVIES_SUCCESS",
        payload:{
          popularMovies:popularMovies.data,
          topRatedMovies:topRatedMovies.data,
          upComingMovies:upComingMovies.data,
          movieGenre:movieGenre.data.genres,
          loading:false,
        }
      })
    } catch (error) {
      dispatch({type:'GET_MOVIES_FAIL'})
    }
    
  }

}
function getDetailMovie (id){
  return async(dispatch)=>{
    try{
      
        let APIkey = process.env.REACT_APP_API_KEY;
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
export const movieAction = {
  getMovies,getDetailMovie
}