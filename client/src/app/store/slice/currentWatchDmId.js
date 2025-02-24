import { createSlice } from '@reduxjs/toolkit'

const currentWatchDmIdSlice = createSlice({
    name: 'currentWatchDmId',
    initialState: {
        value: null,
    },
    reducers: {
        setCurrentWatchDmId: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentWatchDmId } = currentWatchDmIdSlice.actions

export default currentWatchDmIdSlice.reducer
