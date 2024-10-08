import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {dataSchema, SearchData} from '../types'


const ApiKey = 'bba3e09a';
const seriesSearchWord = 'Emily'

export const fetchSeries = createAsyncThunk('movies/fetchSeries', async () => {
    const res = await axios.get(`https://www.omdbapi.com/?apiKey=${ApiKey}&s=${seriesSearchWord}&type=series`)
    const validatedData = dataSchema.safeParse(res.data)
    if(!validatedData.success) {
        console.error(validatedData.error)
    } else {
        return validatedData.data.Search
    }
})


type TInitialState = {
    series: SearchData[],
    status: null | string,
    error: string | undefined
}

const initialState: TInitialState = {
    series: [],
    status: null,
    error: ''
}

const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSeries.pending, (state: TInitialState) => {
            state.status = 'pending'
        })
        builder.addCase(fetchSeries.fulfilled, (state: TInitialState, action) => {
            state.status = 'fulfilled'
            if(action.payload !== undefined) state.series = action.payload
        })
        builder.addCase(fetchSeries.rejected, (state: TInitialState, action) => {
            state.status = 'rejected'
            state.error = action.error.message
            console.log(action)
        })
    }
})

export default seriesSlice.reducer
