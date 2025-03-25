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

const Server = () => {
    const channelId = useSelector(state => state.currentWatchChannelId.value)

    //アイコンの取得には時間がかかる(cloudflare r2のため)
    const serverUserIcons = useSelector(state => state.serverUserIcons.value)
    if (!serverUserIcons)
        return (
            <div className="flex h-screen items-center justify-center bg-[#313338] text-gray-100">
                <ReactLoading
                    type={'spin'}
                    color="#3B82F6"
                    height={50}
                    width={50}
                />
            </div>
        )

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>

            <ChannelListAndUserFiled />

            <div className="flex-1 flex flex-col">
                <MessageContent
                    messageType={'channel'}
                    useMessageCustomHook={useSendMessageInChannel}
                    id={channelId}
                    useOperationMessageCustomHook={useOperationMessageInChannel}
                    userIconList={serverUserIcons}
                />
            </div>

            <UserList serverUserIcons={serverUserIcons}></UserList>
        </div>
    )
}

export default Server
