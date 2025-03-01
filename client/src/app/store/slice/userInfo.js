import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
    name: 'userInfoSlice',
    initialState: {
        value: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
