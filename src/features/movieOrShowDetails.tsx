import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {movieOrShowDataSchema, TmovieOrShowDataSchema} from '../types'

const ApiKey = 'bba3e09a';

export const fetchMovieOrShowDetails = createAsyncThunk('movies/fetchMovieOrShowDetails', async (id: string | undefined): Promise<TmovieOrShowDataSchema | undefined> => {
    const res = await axios.get(`https://www.omdbapi.com/?apiKey=${ApiKey}&i=${id}&plot=full`)
    const validatedData = movieOrShowDataSchema.safeParse(res.data)
    if(!validatedData.success) {
        console.error(validatedData.error)
    } else {
        return validatedData.data
    }
})


type TInitialState = {
    movieOrShowDetails: TmovieOrShowDataSchema,
    status: null | string,
    error: string | undefined
}

const initialState: TInitialState = {
    movieOrShowDetails: {
    Actors: '',
    Awards: '',
    Country: '',
    Director: '',
    Genre: '',
    Plot: '',
    Poster: '',
    Ratings: [
        {
            Value: ''
        }
    ],
    Title: '',
    Type: '',
    Writer: '',
    Year: '',
    },
    status: null,
    error: ''
}

const movieOrShowDetailsSlice = createSlice({
    name: 'movieOrShowDetails',
    initialState,
    reducers: {
        removeMovieOrShow: (state) => {
            state.movieOrShowDetails = {
                Actors: '',
                Awards: '',
                Country: '',
                Director: '',
                Genre: '',
                Plot: '',
                Poster: '',
                Ratings: [
                    {
                        Value: ''
                    }
                ],
                Title: '',
                Type: '',
                Writer: '',
                Year: '',
                }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovieOrShowDetails.pending, (state: TInitialState) => {
            state.status = 'pending'
        })
        builder.addCase(fetchMovieOrShowDetails.fulfilled, (state: TInitialState, action) => {
            state.status = 'fulfilled'
            if(action.payload !== undefined) state.movieOrShowDetails = action.payload
        })
        builder.addCase(fetchMovieOrShowDetails.rejected, (state: TInitialState, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})

export default movieOrShowDetailsSlice.reducer
export const {removeMovieOrShow} = movieOrShowDetailsSlice.actions;