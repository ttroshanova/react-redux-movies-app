import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../types'
import MovieCard from './MovieCard'
import { useDispatch } from 'react-redux'
import { fetchMovies } from './moviesSlice'
import { AppDispatch } from '../types'
import { fetchSeries } from './seriesSlice'
import * as Io from "react-icons/io";
import * as Md from "react-icons/md";
import gsap from 'gsap'

const MoviesListing = () => {
    const movies = useSelector((state: RootState) => state.movies)
    const series = useSelector((state: RootState) => state.series)
    const [content, setContent] = useState('Movies')
    const dispatch = useDispatch<AppDispatch>();
    let movieListing = React.useRef() as React.MutableRefObject<HTMLUListElement>;
    const movieListingContainer = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const incrementor = useRef(0);

    const handleContent = (e: React.ChangeEvent<HTMLSelectElement | undefined>) => {
      if(e.target.value === 'Movies'){
        dispatch(fetchMovies())
      } else if(e.target.value === 'Tv Shows'){
        dispatch(fetchSeries())
      }
      setContent(e.target.value)
    }

    const moveBack = () => {
      const arrowForward = document.querySelector('.forward');
      const arrowBack = document.querySelector('.back');
      arrowForward?.classList.remove('disable')
      incrementor.current = incrementor.current - 1
      movieListing.current.style.transform = `translateX(-${movieListing?.current?.children[0].clientWidth * incrementor.current}px)`;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            arrowBack?.classList.add('disable')
          }
        })
      }, {
        root: movieListingContainer.current,
        threshold: 1.0,
      })
      const children = movieListing?.current.children;
      observer.observe(children[0])
    }

    const moveForward = () => {
      const arrowBack = document.querySelector('.back');
      const arrowForward = document.querySelector('.forward');
      arrowBack?.classList.remove('disable')
      incrementor.current = incrementor.current + 1
      movieListing.current.style.transform = `translateX(-${movieListing?.current?.children[0].clientWidth * incrementor.current}px)`;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            arrowForward?.classList.add('disable')
          }
        })
      }, {
        root: movieListingContainer.current,
        threshold: 1
      })
      const children = movieListing?.current.children;
      observer.observe(children[children.length - 1])
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const children = Array.from(entry.target.children)
            gsap.to(children, {
              duration: 0.7,
              opacity: 1,
              y: 0,
              ease: "power1.inOut",
              stagger: 0.07
            })
        }
      })
    }, {
      root: null,
      threshold: 0.8
    })

    const target = document.querySelector('.movie-listing');
    if(target) {
      observer.observe(target)
    }

    useEffect(() => {
      dispatch(fetchMovies())
    },[dispatch])

  return (
    <section className='trending'>
      <div className='trending-info'>
        <h1>Trending Now</h1>
        <div className="select">
        <select name="content" id="content" onChange={(e) => handleContent(e)}>
          <option value="Movies">Movies</option>
          <option value="Tv Shows">Tv Shows</option>
        </select>
        <Io.IoMdArrowDropdown />
        </div>
      </div>
      <div className='trending-content'>
        <Md.MdOutlineArrowBackIos className='arrow back disable' onClick={moveBack}/>
        <div className='movie-listing-container' ref={movieListingContainer}>
          <ul className='movie-listing' ref={movieListing}>
          {content === 'Movies' ? (
              movies.movies.length === 0 ? <h1>{movies.error}</h1> : (
                movies.movies.map((data, index) => (
                  <MovieCard key={index} index={index} data={data}/>
                ))
              )
            ) : (
              series.series.length === 0 ? <h1>{series.error}</h1> : (
                series.series.map((data, index) => (
                  <MovieCard key={index} index={index} data={data}/>
                ))
              )
            )}
          </ul>
        </div>
        <Md.MdOutlineArrowForwardIos className='arrow forward' onClick={moveForward}/>
      </div>
    </section>
  )
}

export default MoviesListing