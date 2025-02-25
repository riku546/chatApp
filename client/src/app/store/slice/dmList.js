import { createSlice } from '@reduxjs/toolkit'

const dmListSlice = createSlice({
    name: 'dmListSlice',
    initialState: {
        value: [],
    },
    reducers: {
        setDmList: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setDmList } = dmListSlice.actions

export default dmListSlice.reducer
