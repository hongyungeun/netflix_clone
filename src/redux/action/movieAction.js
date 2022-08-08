import api from '../api'
const API_KEY=process.env.REACT_APP_API_KEY
function getMovies(){
  return async(dispatch)=>{
    try {
      dispatch({type:'GET_MOVIE_REQUEST'})
      const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      let topRatedUrl = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      let upComingUrl = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      let genreUrl = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
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
export const movieAction = {
  getMovies,
}