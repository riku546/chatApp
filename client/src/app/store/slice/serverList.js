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
                {
                    server_id: action.payload.server_id,
                    server_name: action.payload.server_name,
                    channel_id: action.payload.channel_id,
                },
            ]
        },
    },
})

export const { setServerList, addServerToServerList } = serverListSlice.actions

export default serverListSlice.reducer
