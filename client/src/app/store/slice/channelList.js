import { createSlice } from '@reduxjs/toolkit'

const channelListSlice = createSlice({
    name: 'channelListSlice',
    initialState: {
        value: null,
    },
    reducers: {
        setChannelList: (state, action) => {
            state.value = action.payload
        },
        //apiサーバー側にリクエスト送ったあとに、画面上で即時に反映させるための関数
        addChannelToChannelList: (state, action) => {
            state.value = [...state.value, action.payload]
        },
    },
})

export const { setChannelList, addChannelToChannelList } =
    channelListSlice.actions

export default channelListSlice.reducer
