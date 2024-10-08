import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {dataSchema} from '../types'
import {SearchData} from '../types'

const ApiKey = 'bba3e09a';
const movieSearchWord = 'Harry'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const res = await axios.get(`https://www.omdbapi.com/?apiKey=${ApiKey}&s=${movieSearchWord}&type=movie`)
    const validatedData = dataSchema.safeParse(res.data)
    if(!validatedData.success) {
        console.error(validatedData.error)
    } else {
        return validatedData.data.Search
    }
})


type TInitialState = {
    movies: SearchData[],
    status: null | string,
    error: string | undefined
}

const initialState: TInitialState = {
    movies: [],
    status: null,
    error: ''
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state: TInitialState) => {
            state.status = 'pending'
        })
        builder.addCase(fetchMovies.fulfilled, (state: TInitialState, action) => {
            state.status = 'fulfilled'
            if(action.payload !== undefined) state.movies = action.payload
        })
        builder.addCase(fetchMovies.rejected, (state: TInitialState, action) => {
            state.status = 'rejected'
            state.error = action.error.message
            console.log(action)
        })
    }
})

export default moviesSlice.reducer
