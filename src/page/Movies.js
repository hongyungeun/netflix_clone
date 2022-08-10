import React,{useEffect, useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { movieAction } from '../redux/action/movieAction'
import {Badge} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../redux/api'
const API_KEY=process.env.REACT_APP_API_KEY
function Movies() {
  const [totalPage,setTotalPage] = useState()
  const [currentPage,setCurrentPage] = useState()
  const [mainData, setMainData] = useState('')
  const navigate = useNavigate()
  let curpage = (a) => {
    setCurrentPage(a) 
  };
  const pagination = ()=>{
    for (let i = 1; i <= 10; i++) {
      
      
        
      
      
    }
  }
  let dispatch = useDispatch()
  let {popularMovies,topRatedMovies,upComingMovies,movieGenre,loading} =useSelector(state=>state.movie)
  let defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
  async function page(){
    let baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    let res = await fetch(baseUrl)
    let data = await res.json()
    setMainData(data)
  }
  useEffect(()=>{
    dispatch(movieAction.getMovies())
    setTotalPage(popularMovies.total_pages)
    setCurrentPage(popularMovies.page)
    navigate(`/movies/?q=${currentPage}`)
    
    page()
  },[])
  useEffect(()=>{
    navigate(`/movies/?q=${currentPage}`)
    page()
    
  },[currentPage])
  
  console.log(popularMovies)
  console.log(mainData)
  if(loading){
    <p>로딩중</p>
  }else
  return (
    <>
      <div className='movie_page_view_wrap'>
        {popularMovies.results.map(item=><><div className='movie_page_poster_wrap'>
          <img src={defaultUrl+item.poster_path} />
          <div className='movie_page_poster_desc'>
            <p>{item.title}</p>
            <p>{item.release_date}</p>
            <p className='movie_page_genre'>{item.genre_ids.map(id=><Badge className='movie_page_badge' bg="danger">{movieGenre.find(item=>item.id == id).name}</Badge>)}</p>
          </div>
          </div></>)}
          <p className='moive_pagination'><span>1</span><span onClick={()=>curpage(2)}>2</span><span>3</span></p>
      </div>
    </>
  )
}

export default Movies