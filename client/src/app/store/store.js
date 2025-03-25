import { configureStore } from '@reduxjs/toolkit'
import dmIdSliceReducer from './slice/currentWatchDmId'
import userInfoSliceReducer from './slice/userInfo'
import serverListSliceReducer from './slice/serverList'
import dmListReducer from './slice/dmList'
import currentWatchChannelIdReducer from './slice/currentWatchChannelId'
import currentWatchServerIdReducer from './slice/currentWatchServerId'
import channelListReducer from './slice/channelList'
import messageReducer from './slice/message'
import friendIconsReducer from './slice/friendIcons'
import serverUserIconsReducer from './slice/serverUserIcons'
import isLoadingMessageReducer from './slice/isLoadingMessage'

const store = configureStore({
    reducer: {
        currentWatchDmId: dmIdSliceReducer,
        currentWatchChannelId: currentWatchChannelIdReducer,
        currentWatchServerId: currentWatchServerIdReducer,
        userInfo: userInfoSliceReducer,
        serverList: serverListSliceReducer,
        dmList: dmListReducer,
        channelList: channelListReducer,
        message: messageReducer,
        friendIcons: friendIconsReducer,
        serverUserIcons: serverUserIconsReducer,
        isLoadingMessage: isLoadingMessageReducer,
    },
})

export default store
