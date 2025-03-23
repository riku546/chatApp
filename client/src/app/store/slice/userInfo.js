import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
    name: 'userInfoSlice',
    initialState: {
        value: {},
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.value = action.payload
        },
        setUserIcon: (state, action) => {
            state.value.icon = action.payload
        },
    },
})

export const { setUserInfo, setUserIcon } = userInfoSlice.actions

export default userInfoSlice.reducer
