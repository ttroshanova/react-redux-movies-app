import React from 'react'
import { SearchData } from '../types'
import { useNavigate } from 'react-router-dom';

type ComponentProps = {
  data: SearchData;
  index: number
}

const MovieCard = ({data, index}: ComponentProps) => {
  const navigate = useNavigate();

  const navigateMovieDetails = () => {
    navigate(`/movie/${data.imdbID}`)
  }

  return (
    <li key={index} className='movie-container'>
      <div className='movie-container-inner' onClick={navigateMovieDetails}>
        <div className='poster-container'>
          <img src={data.Poster} alt={data.Title} />
        </div>
        <div className='movie-info'>
          {data.Title !== 'N/A' && <h4>{data.Title}</h4>}
          {data.Year !== 'N/A' && <p>{data.Year}</p>}
          {data.Type !== 'N/A' && <p>{data.Type}</p>}
        </div>
      </div>
    </li>
  )
}

export default MovieCard