import React, {useState} from 'react'
import './Search.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../types';
import { fetchMoviesOrShows } from './searchMoviesOrShows';
import MovieCard from './MovieCard';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState('')
  const moviesOrShows = useSelector((state: RootState) => state.searchMoviesOrShow) 

  window.addEventListener('click', (e) => {
    const searchLabel = document.querySelector("[for='searchInput']") as HTMLLabelElement
    const input = document.querySelector('#searchInput') as HTMLInputElement

      if(e.target === input || input?.value !== '') {
        searchLabel?.classList.add('small-label')
      } else {
        searchLabel?.classList.remove('small-label')
        input.blur()
      }
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = document.querySelector('#searchInput') as HTMLInputElement
    const searchLabel = document.querySelector("[for='searchInput']") as HTMLLabelElement

    setSearchInput(e.target.value)
    if(input?.value === '') {
      searchLabel?.classList.remove('small-label')
      input.blur()
    } else {
      searchLabel?.classList.add('small-label')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = document.querySelector('#searchInput') as HTMLInputElement
    const searchLabel = document.querySelector("[for='searchInput']") as HTMLLabelElement

    if(e.key === 'Enter' && input?.value !== '') {
      dispatch(fetchMoviesOrShows(searchInput))
      setSearchInput('')
      input.blur()
      searchLabel?.classList.remove('small-label')
    }
  }

  return (
    <section className='search'>
        <h1>Search</h1>
        <div className='label-container'>
            <label htmlFor='searchInput' >Movie or Tv Show</label>
            <div className="input-container">
              <input type="text" id='searchInput' name='searchInput' value={searchInput} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
            </div>
          </div>
        <div className='search-content'>
          <ul>
            {moviesOrShows.moviesOrShows.length !== 0 ? (
              moviesOrShows.moviesOrShows.map((data, index) => (
                <MovieCard key={index} index={index} data={data}/>
              )))
          : 
          (
            <h1>{moviesOrShows.error}</h1>
          )}
          </ul>
        </div>
    </section>
  )
}

export default Search