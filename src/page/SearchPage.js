import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { movieAction } from '../redux/action/movieAction';
import { useNavigate,useSearchParams } from 'react-router-dom'
import {Badge} from 'react-bootstrap'
import NoSearch from '../components/NoSearch';
const defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
function SearchPage() {

  const dispatch = useDispatch()
  const [page,setPage] = useState(1)
  const [currentThisPage,setCurrentThisPage] = useState([])
  const [serach,setSearch] = useState('')
  const [query,setQuery] = useSearchParams()
  const {movieList,movieListLogind} = useSelector(state=>state.movieList)
  const {movieGenre} = useSelector(state=>state.movie)
  const navigate = useNavigate()
  const pagination = ()=>{
        
    const thisPage=[];
    let startBlockPage = Math.floor((movieList.page-1)/10)*10+1;
    let endBlock = startBlockPage+10-1;
    let endBlockPage = movieList.total_pages < endBlock ? movieList.total_pages : endBlock;
    for(let i=startBlockPage; i<= endBlockPage; i++){
      thisPage.push(i)
    }
    setCurrentThisPage(thisPage)

  }
  const prevClick = ()=>{
    let startBlockPage = Math.floor((movieList.page - 1)/10)*10+1;
    let endBlock = startBlockPage+10-1;
    let endBlockPage = movieList.total_pages < endBlock ? movieList.total_pages : endBlock;
    let prevNum = startBlockPage-1;
    console.log('prevNum',prevNum)
    if(prevNum > 1){
      dispatch(movieAction.getMovieList(prevNum,query.get('q')))
      const keyword = query.get('q')
      navigate(`/searchPage?q=${keyword}&page=${prevNum}`)
    }
    
  }
  const nextClick = ()=>{
    let startBlockPage = Math.floor((movieList.page-1)/10)*10+1;
    let endBlock = startBlockPage+10-1;
    let endBlockPage = movieList.total_pages < endBlock ? movieList.total_pages : endBlock;
    let nextNum = endBlockPage+1;
    console.log('nextNum',nextNum)
    if(nextNum<movieList.total_pages){
      dispatch(movieAction.getMovieList(nextNum,query.get('q')))
      const keyword = query.get('q')
      navigate(`/searchPage?q=${keyword}&page=${nextNum}`)
    }
  }

  const onClickPage = (page)=>{
  dispatch(movieAction.getMovieList(page,query.get('q')))
  const keyword = query.get('q')
  navigate(`/searchPage?q=${keyword}&page=${page}`)
  }


  
  useEffect(()=>{
    dispatch(movieAction.getMovieList(page,query.get('q')))
    console.log(currentThisPage)
    console.log(movieList?.total_pages)
    pagination()
  },[])
  useEffect(()=>{
    dispatch(movieAction.getMovieList(page,query.get('q')))
    pagination()
  },[query])
  useEffect(()=>{
    pagination()
  },[movieList.page])
  return (
    <>
      <div className=''>
        {movieListLogind ? <div>로딩중</div>
        :
        <>
          {movieList.total_pages === 0 ? <NoSearch /> 
          :
          <div className='movie_page_view_wrap'>
            {movieList.results.map(item=>
            <>
              <div className='movie_page_poster_wrap'>
                <img src={defaultUrl+item.poster_path} />
                <div className='movie_page_poster_desc'>
                  <p>{item.title}</p>
                  <p>{item.release_date}</p>
                  <p className='movie_page_genre'>{item.genre_ids.map(id=><Badge className='movie_page_badge' bg="danger">{movieGenre.find(item=>item.id === id)?.name}</Badge>)}</p>
                </div>
                
              </div>
            </>
            )}
          </div>
          }
          
          
        </>
        }
      </div>
      {movieList.total_pages !== 0 ?
      <p className='moive_pagination'>
        <span onClick={()=>prevClick()}>&lt;</span>
        {currentThisPage.map((data)=><span 
        onClick={()=>onClickPage(data)
        }
        >{data}</span>)}
        <span onClick={()=>nextClick()}>&gt;</span>
      </p> : <></>
      }
      
    </>
  )
}

export default SearchPage