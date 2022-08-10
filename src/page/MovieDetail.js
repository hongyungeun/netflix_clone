import React,{useEffect,useState} from 'react'
import { movieAction } from '../redux/action/movieAction'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Badge} from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader";
import {useNavigate} from 'react-router-dom';
import YouTube from 'react-youtube';

function MovieDetail() {
  const navigate = useNavigate()
  const {thisUrl,movieReview,movieRecommend,movieVideo,detailLoding} = useSelector(state=>state.movie)
  // const [movieData,setMovieData] = useState('')
  // const [movieReview,setMovieReview] = useState([])
  // const [movieChoice,setMovieChoice] = useState([])
  // const [thisMovieVideo,setThisMovieVideo] = useState([])
  const movieVideoLength = Math.floor(Math.random() * movieVideo.length)
  const [reviewOn,setReviewOn] = useState(true)
  const [videoOn,setVideoOn] = useState(false)
  let {id} = useParams()
  
  
  // async function movie (id){
  //   let APIkey = process.env.REACT_APP_API_KEY;
  //   let thisUrl = api.get(`/movie/${id}?api_key=${APIkey}&language=en-US`)
  //   let movieReview = api.get(`/movie/${id}/reviews?api_key=${APIkey}&language=en-US&page=1`)
  //   let movieRecommend = api.get(`/movie/${id}/recommendations?api_key=${APIkey}&language=en-US&page=1`)
  //   let movieVideo = api.get(`/movie/${id}/videos?api_key=${APIkey}&language=en-US`)
  //   let [res,reviewRes,movieRecommendRes,movieVideoRes] = await Promise.all([thisUrl,movieReview,movieRecommend,movieVideo]);
  //   setMovieData(res.data)
  //   setMovieReview(reviewRes.data.results)
  //   setMovieChoice(movieRecommendRes.data.results)
  //   setThisMovieVideo(movieVideoRes.data.results)
  //   setLoding(false)
  // }
  
  const goDetail = (id)=>{
    console.log(id)
    navigate(`/movies/${id}`)
  }
  
  let dispatch = useDispatch()
  useEffect(()=>{
    // movie(id)
    dispatch(movieAction.getDetailMovie(id))
  },[id])
  
  
  console.log('씨발',thisUrl)
  console.log('씨발 리뷰',movieReview)
  console.log('씨발 영화추천',movieRecommend)
  console.log('씨발 영화 예고편',movieVideo)
  let defaultUrl =`https://www.themoviedb.org/t/p/w300_and_h450_bestv2`
  if(detailLoding){
    <ClipLoader className='loading' color={'#fff'}  size={150} />
  }else
  return (
    <div className='movie_detail'>
      <div className='movie_detail_wrap'>
        <div className='movie_detail_left'><img src={defaultUrl+thisUrl.poster_path} /></div>
        <div className='movie_detail_right'>
          <div>{thisUrl.genres.map(item=><Badge bg="danger" className='detail_genre'>{item.name}</Badge>)}</div>
          <div className='movie_detail_title'>{thisUrl.original_title}</div>
          <div className='score_wrap'><span>평점 : {Math.round(thisUrl.vote_average * 10)/10}</span> <span>RunTime : {thisUrl.runtime}</span></div>
          <hr/>
          <div>
          SUMMARY : <br />{thisUrl.overview}
          </div>
          <hr/>
          <div>
            <p>Budget : {thisUrl.budget} </p>
            <p>Release Day : {thisUrl.release_date}</p>
          </div>
          <hr />
          <span className='trailer' onClick={()=>setVideoOn(true)}>
            Watch Random Trailer
          </span>
          {videoOn ?
            <>
              <div className='trailer_overlay'></div>
              <div className='movie_trailer_pop'>
                <span className='trailer_close' onClick={()=>setVideoOn(false)}>x</span>
                <YouTube videoId={movieVideo[movieVideoLength]?.key}></YouTube>
              </div> 
            </>
            :
            <></>
          }
          
        </div>
      </div>
      <div className='review_wrap'>
        {reviewOn ? <><span className='review_title review on'>REVIEW</span><span className='review_title choice'onClick={()=>setReviewOn(false)}>RELATED MOVIES({movieRecommend.length})</span></> 
        : 
        <><span onClick={()=>setReviewOn(true)} className='review_title review' >REVIEW</span><span className='review_title choice on'>RELATED MOVIES({movieRecommend.length})</span></>}
        <div>
          {reviewOn ? <>{movieReview.map((item)=>(<><div>{item.author}<br/>{item.content}</div><hr/></>))}</>
          :
          <div className='movie_recommend_card'>
            {movieRecommend.map(item=>(<><div><img onClick={()=>goDetail(item.id)} src={defaultUrl + item.poster_path} /> </div></>))}
          </div>}
         
          
        </div>
      </div>
    </div>
  )
}

export default MovieDetail