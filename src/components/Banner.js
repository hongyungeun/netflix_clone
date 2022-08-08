import React from 'react'

function Banner({movie}) {
  return (
    <div className='main_banner' style={{backgroundImage:"url("+`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}` + ")"}}>
      <div className='banner_info'>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default Banner