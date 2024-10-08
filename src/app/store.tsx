import { configureStore } from "@reduxjs/toolkit"
import movieReducer from '../features/moviesSlice'
import seriesReducer from '../features/seriesSlice'
import movieOrShowDetailsReducer from '../features/movieOrShowDetails'
import searchMoviesOrShowsReducer from '../features/searchMoviesOrShows'

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        series: seriesReducer,
        movieOrShowDetails: movieOrShowDetailsReducer,
        searchMoviesOrShow: searchMoviesOrShowsReducer
    }
})