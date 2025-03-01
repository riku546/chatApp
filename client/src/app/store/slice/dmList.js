import { createSlice } from '@reduxjs/toolkit'

const dmListSlice = createSlice({
    name: 'dmListSlice',
    initialState: {
        value: null,
    },
    reducers: {
        setDmList: (state, action) => {
            state.value = action.payload
        },
        //apiサーバー側にリクエスト送ったあとに、画面上で即時に反映させるための関数
        addDmToDmList: (state, action) => {
            state.value = [
                ...state.value,
                { name: action.payload.name, dm_id: action.payload.dm_id },
            ]
        },
    },
})

export const { setDmList, addDmToDmList } = dmListSlice.actions

export default dmListSlice.reducer
