import { createSlice } from '@reduxjs/toolkit'

const friendIconsSlice = createSlice({
    name: 'friendIcons',
    initialState: {
        value: null,
    },
    reducers: {
        setFriendIcons: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setFriendIcons } = friendIconsSlice.actions

export default friendIconsSlice.reducer
