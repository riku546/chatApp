import { createSlice } from '@reduxjs/toolkit'

const dmIdSlice = createSlice({
    name: 'dmId',
    initialState: {
        value: null,
    },
    reducers: {
        setDmId: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setDmId } = dmIdSlice.actions

export default dmIdSlice.reducer
