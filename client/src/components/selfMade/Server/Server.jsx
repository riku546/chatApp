import React from 'react'
import ServerList from '../ServerList'
import MessageContent from '../MessageContent'
import ChannelListAndUserFiled from './channelListAndUserFiled/ChannelListAndUserFiled'
import {
    useOperationMessageInChannel,
    useSendMessageInChannel,
} from '@/hooks/components/MessageContent'
import { useSelector } from 'react-redux'
import UserList from './userList/UserList'
import ReactLoading from 'react-loading'
import BottomNav from '../Responsive/BottomNav/BottomNav'
import ServerDrawer from '../Responsive/BottomNav/ServerDrawer'
import DmDrawer from '../Responsive/BottomNav/DmDrawer'
import ChannelDrawer from '../Responsive/BottomNav/ChannelDrawer'

const Server = () => {
    const channelId = useSelector(state => state.currentWatchChannelId.value)

    //アイコンの取得には時間がかかる(cloudflare r2のため)
    const serverUserIcons = useSelector(state => state.serverUserIcons.value)
    if (!serverUserIcons)
        return (
            <div className="flex h-screen items-center justify-center bg-[#313338] text-gray-100">
                ローディング...
            </div>
        )

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <div className="hidden md:block">
                <ServerList></ServerList>
            </div>
            <div className="hidden md:flex">
                <ChannelListAndUserFiled />
            </div>
            <div className="h-full flex-1">
                <div className="h-full flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <MessageContent
                            messageType={'channel'}
                            useMessageCustomHook={useSendMessageInChannel}
                            id={channelId}
                            useOperationMessageCustomHook={
                                useOperationMessageInChannel
                            }
                            userIconList={serverUserIcons}
                        />
                    </div>

                    <BottomNav>
                        <ServerDrawer />
                        <ChannelDrawer />
                    </BottomNav>
                </div>
            </div>

            <div className="hidden md:flex">
                <UserList serverUserIcons={serverUserIcons}></UserList>
            </div>
        </div>
    )
}

export default Server
