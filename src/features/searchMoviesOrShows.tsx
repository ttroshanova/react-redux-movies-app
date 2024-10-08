import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dataSchema } from "src/types";
import {SearchData} from '../types'

const ApiKey = 'bba3e09a';

export const fetchMoviesOrShows = createAsyncThunk('searchMoviesOrShows/fetchMoviesOrShows', async (title: string) => {
    const res = await axios.get(`https://www.omdbapi.com/?apiKey=${ApiKey}&s=${title}`)
    const validatedData = dataSchema.safeParse(res.data)
    if(!validatedData.success) {
        console.error(validatedData.error)
    } else {
        return validatedData.data.Search
    }
})

type TInitialState = {
    moviesOrShows: SearchData[],
    status: null | string,
    error: string | undefined
}

const initialState: TInitialState = {
    moviesOrShows: [],
    status: null,
    error: ''
}

const searchMoviesOrShows = createSlice({
    name: 'searchMoviesOrShows',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesOrShows.pending, (state: TInitialState) => {
            state.status = 'pending'
        })
        builder.addCase(fetchMoviesOrShows.fulfilled, (state: TInitialState, action) => {
            state.status = 'fulfilled'
            if(action.payload !== undefined) {
                state.moviesOrShows = action.payload
            } else {
                state.moviesOrShows = []
                state.error = 'Error 404'
            }
        })
        builder.addCase(fetchMoviesOrShows.rejected, (state: TInitialState, action) => {
            state.status = 'rejected'
            console.log('rejected')
            state.error = action.error.message
        })
    }
})

export default searchMoviesOrShows.reducer;