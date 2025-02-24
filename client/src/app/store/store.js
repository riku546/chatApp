import { configureStore } from '@reduxjs/toolkit'
import dmIdSliceReducer from './slice/dmIdSlice'

const store = configureStore({
    reducer: {
        dmId: dmIdSliceReducer,
    },
})

export default store
