import { createSlice } from '@reduxjs/toolkit'

const currentWatchChannelIdSlice = createSlice({
    name: 'currentWatchChannelId',
    initialState: {
        value: null,
    },
    reducers: {
        setCurrentWatchChannelId: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentWatchChannelId } = currentWatchChannelIdSlice.actions

export default currentWatchChannelIdSlice.reducer