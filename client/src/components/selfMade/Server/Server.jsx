import React from 'react'
import ServerList from './serverList/ServerList'
import MessageContent from '../MessageContent'
import ChannelListAndUserFiled from './channelListAndUserFiled/ChannelListAndUserFiled'
import { useSendMessageInChannel } from '@/hooks/components/MessageContent'
import { useSelector } from 'react-redux'
import useChannel from '@/hooks/page/useChannel'

const Server = ({ messages, setMessages }) => {
    const channelId = useSelector(state => state.currentWatchChannelId.value)

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>

            <ChannelListAndUserFiled />

            <div className="flex-1 flex flex-col">
                <MessageContent
                    messages={messages}
                    setMessages={setMessages}
                    messageType={'channel'}
                    useMessageCustomHook={useSendMessageInChannel}
                    id={channelId}
                />
            </div>
        </div>
    )
}

export default Server
