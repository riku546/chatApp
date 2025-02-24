import { createSlice } from '@reduxjs/toolkit'

const serverListSlice = createSlice({
    name: 'serverListSlice',
    initialState: {
        value: null,
    },
    reducers: {
        setServerList: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setServerList } = serverListSlice.actions

export default serverListSlice.reducer
