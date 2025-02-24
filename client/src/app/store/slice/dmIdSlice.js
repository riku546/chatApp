import { createSlice } from '@reduxjs/toolkit'

const dmIdSlice = createSlice({
    name: 'dmId',
    initialState: {
        value: null,
    },
    reducers: {
        setCurrentWatchDmId: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentWatchDmId } = dmIdSlice.actions

export default dmIdSlice.reducer
