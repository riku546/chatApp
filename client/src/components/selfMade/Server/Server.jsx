import React from 'react'
import ServerList from './serverList/ServerList'
import MessageContent from '../MessageContent'
import ChannelListAndUserFiled from './channelListAndUserFiled/ChannelListAndUserFiled'

const Server = ({
    messages,
    setMessages,
    channelId,
    channelList,
    currentWatchChannelId,
}) => {
    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>

            <ChannelListAndUserFiled
                channelList={channelList}
                currentWatchChannelId={currentWatchChannelId}
            />

            <div className="flex-1 flex flex-col">
                <MessageContent
                    messages={messages}
                    setMessages={setMessages}
                    messageType={'channel'}
                    id={channelId}
                />
            </div>
        </div>
    )
}

export default Server
