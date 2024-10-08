import React, { useEffect } from 'react'
import {gsap} from 'gsap'

const LazyMovieDetails = ({movieOrShowDetails}) => {

  useEffect(() => {
    const animateItems = [...document.querySelectorAll('.animate')];
    for(const item of animateItems){
      if(item) {
        gsap.to('.animate', {
          duration: 0.7,
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          stagger: 0.07
        })
      }
    }
  },[])

  return (
    <>
      <div className="movieOrShowContainer-inner">
        <div className="img-container">
          {(movieOrShowDetails.Poster !== 'N/A' && movieOrShowDetails.Poster !== undefined) && (
          <img src={movieOrShowDetails.Poster} alt={movieOrShowDetails.Title} className='animate'/>
          )}
        </div>
        <div className="content">
          <div className="content-inner">
            {(movieOrShowDetails.Title !== 'N/A' && movieOrShowDetails.Title !== undefined) && (
            <h2 className='animate'>{movieOrShowDetails.Title}</h2>
            )}
            <div className='details'>
                {(movieOrShowDetails.Year !== 'N/A' && movieOrShowDetails.Year !== undefined) && (
                <p className='animate'>{movieOrShowDetails.Year}</p>
                )}
                {(movieOrShowDetails.Genre !== 'N/A' && movieOrShowDetails.Genre !== undefined) && (
                <p className='animate'>{movieOrShowDetails.Genre}</p>
                )}
                {(movieOrShowDetails.Type !== 'N/A' && movieOrShowDetails.Type !== undefined) && (
                <p className='animate'>{movieOrShowDetails.Type}</p>
                )}
                {(movieOrShowDetails.Ratings[0]?.Value !== 'N/A' && movieOrShowDetails.Ratings[0]?.Value !== undefined) && (
                <p className='animate'>{movieOrShowDetails.Ratings[0]?.Value}</p>
                )}
            </div>
            {(movieOrShowDetails.Plot !== 'N/A' && movieOrShowDetails.Plot !== undefined) && (
            <div className='plot animate'>
                <p>{movieOrShowDetails.Plot}</p>
            </div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default LazyMovieDetails