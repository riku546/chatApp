import { createSlice } from '@reduxjs/toolkit'

const currentWatchServerIdSlice = createSlice({
    name: 'currentWatchServerId',
    initialState: {
        value: null,
    },
    reducers: {
        setCurrentWatchServerId: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentWatchServerId } = currentWatchServerIdSlice.actions

export default currentWatchServerIdSlice.reducer