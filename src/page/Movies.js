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
  const [arr,setArr] = useState([])
  const [currentPage,setCurrentPage] = useState()
  const navigate = useNavigate()
  const [query,setQuery] = useSearchParams()
  const arr2 = [];
  const pagination = ()=>{
    
    // for (let i = prev; i <= next; i++) {
    //   // setArr((prev)=>[...prev,i])
    //   setArr([arr.push(i)])
    // }
    for(let i=prev; i<= next; i++){
      arr2.push(i)
    }
  }

  
  const dispatch = useDispatch()
  const {popularMovies,topRatedMovies,upComingMovies,movieGenre,loading,movieList} =useSelector(state=>state.movie)
  const defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`

  const navigateF = (currentPage)=>{
    navigate(`/movies?page=${currentPage}`)
  }
  // useEffect(()=>{
  //   pagination()
  // },[])
  useEffect(()=>{
    pagination()
  },[prev,next])
  useEffect(()=>{
    setCurrentPage(query.get('page'))
    dispatch(movieAction.getMovies(currentPage))
    console.log(arr2)
    
  },[currentPage])
  
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
              {/* <span>1</span>
              <span onClick={()=>{setCurrentPage(2) 
                navigate(`/movies?page=${2}`)}}>2</span>
              <span>3</span> */}
              <span onClick={()=>{
                if(prev === 1){

                }else {
                  setPrev(prev-10); setNext(next-10)
                }
                }}>&lt;</span>
              { pagination()}
              { arr2.map((i)=><><span onClick={()=>{setCurrentPage(i) 
                navigate(`/movies?page=${i}`)}}>{i}</span></>)}
              <span onClick={()=>{
                if(next > movieList.total_page){

                }else {
                  setPrev(prev+10); setNext(next+10)
                }
                }}>&gt;</span>
            </p>
        </>)
    }
      
    </>
  )
}

export default Movies

