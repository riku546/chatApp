import { createSlice } from '@reduxjs/toolkit'

const friendIconListSlice = createSlice({
    name: 'friendIconList',
    initialState: {
        value: null,
    },
    reducers: {
        setFriendIconList: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setFriendIconList } = friendIconListSlice.actions

export default friendIconListSlice.reducer
