import React from 'react'
import ServerList from '../ServerList'
import MessageContent from '../MessageContent'
import ChannelListAndUserFiled from './channelListAndUserFiled/ChannelListAndUserFiled'
import {
    useOperationMessageInChannel,
    useSendMessageInChannel,
} from '@/hooks/components/MessageContent'
import { useSelector } from 'react-redux'

const Server = () => {
    const channelId = useSelector(state => state.currentWatchChannelId.value)

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
                />
            </div>
        </div>
    )
}

export default Server
