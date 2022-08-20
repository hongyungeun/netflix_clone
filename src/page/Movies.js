import React,{useEffect, useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { movieAction } from '../redux/action/movieAction'
import {Badge} from 'react-bootstrap'
import { useNavigate,useSearchParams } from 'react-router-dom'
import api from '../redux/api'

const API_KEY=process.env.REACT_APP_API_KEY
function Movies() {
  const [prev,setPrev]= useState(1)
  const [next,setNext]= useState(10)

  const [pageCurrent,setPageCurrent] = useState([])
  const [totalResult,setTotalResult] = useState('')
  const [totalPage,setTotalPage] = useState('')
  const [startPage, setStartPage] = useState('')
  const [endPage, setEndPage] = useState('')

  const [arr,setArr] = useState([])
  const [currentPage,setCurrentPage] = useState()
  const navigate = useNavigate()
  const [query,setQuery] = useSearchParams()
  const pagination = ()=>{

    for(let i=startPage; i<= endPage; i++){
      pageCurrent.push(<span onClick={()=>{setCurrentPage(i); navigate(`/movies?page=${i}`)}}>{i}</span>)
    }
    
  }

  
  const dispatch = useDispatch()
  const {popularMovies,topRatedMovies,upComingMovies,movieGenre,loading,movieList} =useSelector(state=>state.movie)
  const defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`

  const navigateF = (currentPage)=>{
    navigate(`/movies?page=${currentPage}`)
  }
  // useEffect(()=>{
  //   setTotalPage(movieList.total_page)
  //   setTotalResult(movieList.total_results)
  //   setStartPage(Math.floor(currentPage / 10 )*10+1)
  //   setEndPage((Math.floor(currentPage / 10 )*10+1)+10 -1)
  // },[startPage])

  useEffect(()=>{
    setCurrentPage(query.get('page'))
    setTotalPage(movieList.total_page)
    setTotalResult(movieList.total_results)
    setStartPage(Math.floor(currentPage / 10 )*10+1)
    setEndPage((Math.floor(currentPage / 10 )*10+1)+10 -1)
    dispatch(movieAction.getMovies(currentPage))
  },[currentPage])
  console.log(startPage)
  console.log(endPage)
  return (
    <>
    {
      loading ? 
      <p>로딩중</p> 
      :
      (<>
        <div className='movie_page_view_wrap'>
          {movieList?.results.map(item=><><div className='movie_page_poster_wrap'>
            <img src={defaultUrl+item.poster_path} />
            <div className='movie_page_poster_desc'>
              <p>{item.title}</p>
              <p>{item.release_date}</p>
              <p className='movie_page_genre'>{item.genre_ids.map(id=><Badge className='movie_page_badge' bg="danger">{movieGenre.find(item=>item.id == id).name}</Badge>)}</p>
            </div>
            </div></>)}
            
          </div>
            <p className='moive_pagination'>
              <span onClick={()=>{
                if(startPage === 1){

                }else {
                  setStartPage(startPage-10);
                  navigate(`/movies?page=${endPage}`)
                }
              }}>&lt;</span>
              { pagination()}
              <span onClick={()=>{
                if(endPage > totalPage){

                }else {
                  setStartPage(startPage+10)
                  navigate(`/movies?page=${startPage}`)
                }
              }}>&gt;</span>
            </p>
        </>)
    }
      
    </>
  )
}

export default Movies

