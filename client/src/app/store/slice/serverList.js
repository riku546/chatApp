import { createSlice } from '@reduxjs/toolkit'

const serverListSlice = createSlice({
    name: 'serverListSlice',
    initialState: {
        value: [],
    },
    reducers: {
        setServerList: (state, action) => {
            state.value = action.payload
        },
        //apiサーバー側にサーバー作成リクエスト送ったあとに、画面上で即時に反映させるための関数
        addServerToServerList: (state, action) => {
            state.value = [
                ...state.value,
                { id: state.value.length + 1, name: action.payload },
            ]
        },
    },
})

export const { setServerList, addServerToServerList } = serverListSlice.actions

export default serverListSlice.reducer
