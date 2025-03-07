import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        value: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.value = action.payload
        },
        //apiサーバー側にリクエスト送ったあとに、画面上で即時に反映させるための関数
        addMessageToMessageState: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        deleteMessage: (state, action) => {
            state.value = state.value.filter(
                message => message.created_at !== action.payload,
            )
        },
    },
})

export const { setMessage, addMessageToMessageState, deleteMessage } =
    messageSlice.actions

export default messageSlice.reducer
