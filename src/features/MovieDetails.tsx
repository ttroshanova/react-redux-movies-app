import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../types';
import { fetchMovieOrShowDetails, removeMovieOrShow } from './movieOrShowDetails';
import PulseLoader from 'react-spinners/PulseLoader'
import LazyMovieDetails from './LazyMovieDetails'

const MovieOrShowDetails = () => {
  const {imdbID} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const movieOrShowDetails = useSelector((state: RootState) => state.movieOrShowDetails.movieOrShowDetails)
  const initialState = useSelector((state: RootState) => state.movieOrShowDetails);

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(fetchMovieOrShowDetails(imdbID))
    return () => {dispatch(removeMovieOrShow())}
  },[dispatch, imdbID])
  
  return (
    <div className='wrapper'>
      <div className="movieOrShowContainer">
        {initialState.status === 'pending' ? (
          <PulseLoader color='rgb(0, 255, 200)'/>
        ) : (
          <LazyMovieDetails movieOrShowDetails={movieOrShowDetails}/>
        )}
      </div>
    </div>
  )
}

export default MovieOrShowDetails

