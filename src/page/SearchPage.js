import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { movieAction } from '../redux/action/movieAction';
import { useNavigate,useSearchParams } from 'react-router-dom'
function SearchPage() {
  const dispatch = useDispatch()
  const [page,setPage] = useState(1)
  const [serach,setSearch] = useState('')
  const [query,setQuery] = useSearchParams()
  const {movieList,movieListLogind} = useSelector(state=>state.movieList)
  useEffect(()=>{
    
    dispatch(movieAction.getMovieList(page,query.get('q')))
  },[])
  useEffect(()=>{

  },[])
  console.log(movieList)
  return (
    <div>
      {movieListLogind ? <div>로딩중</div>:
      <>
      {movieList.results.map(item=><><div>{item.title}</div></>)}
      </>
      }
    </div>
  )
}

export default SearchPage