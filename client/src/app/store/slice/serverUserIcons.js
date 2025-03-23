import { createSlice } from '@reduxjs/toolkit'

const serverUserIconsSlice = createSlice({
    name: 'serverUserIcons',
    initialState: {
        value: null,
    },
    reducers: {
        setServerUserIcons: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setServerUserIcons } = serverUserIconsSlice.actions

export default serverUserIconsSlice.reducer
