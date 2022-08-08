import React,{useEffect} from 'react'
import {movieAction} from '../redux/action/movieAction'
import { useDispatch,useSelector } from 'react-redux'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";
function Home() {
  const dispatch = useDispatch()
  const {popularMovies,topRatedMovies,upComingMovies,loading} = useSelector((state)=>state.movie)
  let random =Math.floor((Math.random() * 20)) 
  useEffect(()=>{
    dispatch(movieAction.getMovies())
  },[])
  if(loading){
    return <ClipLoader className='loading' color={'#fff'} loading={loading}  size={150} />
  }
  return (
    <div>
      
      <Banner movie={popularMovies.results[random]}/>
      <h2>Popular Movies</h2>
      <MovieSlide movies={popularMovies}/>
      <h2>Top Rated Movies</h2>
      <MovieSlide movies={topRatedMovies}/>
      <h2>Upcoming Movies</h2>
      <MovieSlide movies={upComingMovies}/>
    </div>
  )
}

export default Home