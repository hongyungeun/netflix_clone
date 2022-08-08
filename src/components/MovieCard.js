import React from 'react'
import {Badge} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function MovieCard({item}) {
  
  const navigate = useNavigate()
  const goDetail = ()=>{
    console.log('this movie',item)
    navigate(`/movies/${item.id}`)
  }
  const {movieGenre} = useSelector(state=>state.movie)
  return (
    <div onClick={goDetail} className='movie_card' style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}` +")"}}>
      <div className='card_hover'>
        <p>{item.title}</p>
        <div>{item.genre_ids.map((id)=>(<Badge bg="danger">{movieGenre.find(item=>item.id == id).name}</Badge>))}</div>
        <div>평점 : {item.vote_average} {item.adult ? '청소년 관람불가' : '청소년 관람가능'}</div>
      </div>
    </div>
  )
}

export default MovieCard