import { createSlice } from '@reduxjs/toolkit'

const isLoadingMessage = createSlice({
    name: 'isLoadingMessage',
    initialState: {
        value: false,
    },
    reducers: {
        setIsLoadingMessage: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setIsLoadingMessage } = isLoadingMessage.actions

export default isLoadingMessage.reducer
