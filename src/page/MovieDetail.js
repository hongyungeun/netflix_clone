import React,{useEffect,useState} from 'react'
import { movieAction } from '../redux/action/movieAction'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Badge} from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader";
import api from '../redux/api'
import {useNavigate} from 'react-router-dom'
function MovieDetail() {
  let navigate = useNavigate()
  let [movieData,setMovieData] = useState('')
  let [movieReview,setMovieReview] = useState([])
  let [movieChoice,setMovieChoice] = useState([])
  let [reviewOn,setReviewOn] = useState(true)
  let [loading,setLoding] = useState(true)
  let {id} = useParams()

  async function movie (id){
    let APIkey = process.env.REACT_APP_API_KEY;
    let thisUrl = api.get(`/movie/${id}?api_key=${APIkey}&language=en-US`)
    let movieReview = api.get(`/movie/${id}/reviews?api_key=${APIkey}&language=en-US&page=1`)
    let movieRecommend = api.get(`/movie/${id}/recommendations?api_key=${APIkey}&language=en-US&page=1`)
    let [res,reviewRes,movieRecommendRes] = await Promise.all([thisUrl,movieReview,movieRecommend]);
    setMovieData(res.data)
    setMovieReview(reviewRes.data.results)
    setMovieChoice(movieRecommendRes.data.results)
    setLoding(false)
  }
  
  const goDetail = (id)=>{
    console.log(id)
    navigate(`/movies/${id}`)
    window.location.reload()
  }
  
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(movieAction.getMovies())
    movie(id)
    
  },[])
  
  console.log('씨발',movieData)
  console.log('씨발 리뷰',movieReview)
  console.log('씨발 영화추천',movieChoice)
  let defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
  if(loading){
    <ClipLoader className='loading' color={'#fff'} loading={loading}  size={150} />
  }else
  return (
    <div className='movie_detail'>
      <div className='movie_detail_wrap'>
        <div className='movie_detail_left'><img src={defaultUrl+movieData.poster_path} /></div>
        <div className='movie_detail_right'>
          <div>{movieData.genres.map(item=><Badge bg="danger" className='detail_genre'>{item.name}</Badge>)}</div>
          <div className='movie_detail_title'>{movieData.original_title}</div>
          <div className='score_wrap'><span>평점 : {Math.round(movieData.vote_average * 10)/10}</span> <span>RunTime : {movieData.runtime}</span></div>
          <hr/>
          <div>
          SUMMARY : <br />{movieData.overview}
          </div>
          <hr/>
          <div>
            <p>Budget : {movieData.budget} </p>
            <p>Release Day : {movieData.release_date}</p>
          </div>
          <hr />
          <span className='trailer'>
            Watch Trailer
          </span>
          <div className='movie_trailer_pop'>

          </div>
        </div>
      </div>
      <div className='review_wrap'>
        {reviewOn ? <><span className='review_title review on'>REVIEW</span><span className='review_title choice'onClick={()=>setReviewOn(false)}>RELATED MOVIES({movieChoice.length})</span></> 
        : 
        <><span onClick={()=>setReviewOn(true)} className='review_title review' >REVIEW</span><span className='review_title choice on'>RELATED MOVIES({movieChoice.length})</span></>}
        <div>
          {reviewOn ?  <>{movieReview.map((item)=>(<><div>{item.author}<br/>{item.content}</div><hr/></>))}</>
          :
          <div className='movie_recommend_card'>
            {movieChoice.map(item=>(<><div><img onClick={()=>goDetail(item.id)} src={defaultUrl + item.poster_path} /> </div></>))}
          </div>}
         
          
        </div>
      </div>
    </div>
  )
}

export default MovieDetail