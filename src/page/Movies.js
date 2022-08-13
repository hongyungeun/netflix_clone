import React,{useEffect, useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { movieAction } from '../redux/action/movieAction'
import {Badge} from 'react-bootstrap'
import { useNavigate,useSearchParams } from 'react-router-dom'
import api from '../redux/api'

const API_KEY=process.env.REACT_APP_API_KEY
function Movies() {
  
  const [currentPage,setCurrentPage] = useState()
  const navigate = useNavigate()
  const [query,setQuery] = useSearchParams()
  const pagination = ()=>{
    for (let i = 1; i <= popularMovies.total_pages; i++) {

    }
  }
  
  const dispatch = useDispatch()
  const {popularMovies,topRatedMovies,upComingMovies,movieGenre,loading,movieList} =useSelector(state=>state.movie)
  const defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
  // useEffect(()=>{
  //   // setCurrentPage(query.get('page'))
  //   dispatch(movieAction.getMovies(currentPage))
  //   // dispatch(movieAction.getMovieList(currentPage))
  //   // setMainData(movieList)
  //   navigate(`/movies?page=${currentPage}`)
  //   // console.log(mainData)
  //   setThisLoading(false)
  // },[])
  const navigateF = (currentPage)=>{
    navigate(`/movies?page=${currentPage}`)
  }
  // useEffect(()=>{
  //   dispatch(movieAction.getMovies(currentPage))
  // },[])
  useEffect(()=>{
    dispatch(movieAction.getMovies(currentPage))
  },[currentPage])
  console.log(movieList)
  // if(loading){
  //   <p>로딩중</p>
  // }else
  
  return (
    <>
    {
      loading ? 
      <p>로딩중</p> 
      :
      (<><div className='movie_page_view_wrap'>
      {movieList?.results.map(item=><><div className='movie_page_poster_wrap'>
        <img src={defaultUrl+item.poster_path} />
        <div className='movie_page_poster_desc'>
          <p>{item.title}</p>
          <p>{item.release_date}</p>
          <p className='movie_page_genre'>{item.genre_ids.map(id=><Badge className='movie_page_badge' bg="danger">{movieGenre.find(item=>item.id == id).name}</Badge>)}</p>
        </div>
        </div></>)}
        
        <p className='moive_pagination'><span>1</span>
        <span onClick={()=>{setCurrentPage(2) 
          navigate(`/movies?page=${2}`)}}>2</span>
        <span>3</span></p>
        </div></>)
    }
      
    </>
  )
}

export default Movies