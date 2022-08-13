import React,{useEffect, useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { movieAction } from '../redux/action/movieAction'
import {Badge} from 'react-bootstrap'
import { useNavigate,useSearchParams } from 'react-router-dom'
import api from '../redux/api'
const API_KEY=process.env.REACT_APP_API_KEY
function Movies() {
  let [thisLoading,setThisLoading] = useState(true)
  const [totalPage,setTotalPage] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
  const [mainData, setMainData] = useState('')
  const navigate = useNavigate()
  // let curpage = (a) => {
  //   setCurrentPage(a) 
  // };
  let [query,setQuery] = useSearchParams()
  console.log()
  const pagination = ()=>{
    for (let i = 1; i <= popularMovies.total_pages; i++) {

    }
  }
  let dispatch = useDispatch()
  let {popularMovies,topRatedMovies,upComingMovies,movieGenre,loading,movieList} =useSelector(state=>state.movie)
  // let {movieList} = useSelector(state=>state.movie)
  let defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
  // useEffect(()=>{
  //   setCurrentPage(query.get('page'))
  //   dispatch(movieAction.getMovies())
  //   dispatch(movieAction.getMovieList(currentPage))
  //   setMainData(movieList)
  //   navigate(`/movies?page=${currentPage}`)
  //   console.log(mainData)
  //   setThisLoading(false)
  // },[])
  useEffect(()=>{
    setCurrentPage(query.get('page'))
    dispatch(movieAction.getMovies(currentPage))
    // dispatch(movieAction.getMovieList(currentPage))
    navigate(`/movies?page=${currentPage}`)
    // setMainData(movieList)
    setThisLoading(false)
    console.log(movieList)
    console.log(popularMovies)
    console.log(`useEffect바깥쪽에서 실행 ${currentPage}`)
    console.log(`maindata ${mainData}`)
    
  },[])
  
  if(thisLoading){
    <p>로딩중</p>
  }else
  return (
    <>
      <div className='movie_page_view_wrap'>
        {movieList.results.map(item=><><div className='movie_page_poster_wrap'>
          <img src={defaultUrl+item.poster_path} />
          <div className='movie_page_poster_desc'>
            <p>{item.title}</p>
            <p>{item.release_date}</p>
            <p className='movie_page_genre'>{item.genre_ids.map(id=><Badge className='movie_page_badge' bg="danger">{movieGenre.find(item=>item.id == id).name}</Badge>)}</p>
          </div>
          </div></>)}
          <p className='moive_pagination'><span>1</span><span onClick={()=>setCurrentPage(2)}>2</span><span>3</span></p>
      </div>
    </>
  )
}

export default Movies