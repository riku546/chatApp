'use client'

import Server from '@/components/selfMade/Server/Server'
import { useDispatch, useSelector } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import useChannel from '@/hooks/page/useChannel'
import { useParams } from 'next/navigation'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'
import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'

const page = () => {
    useInitialProcess()

    const dispatch = useDispatch()

    const channelId = useParams().channelId
    dispatch(setCurrentWatchChannelId(channelId))

    const serverId = useParams().serverId
    dispatch(setCurrentWatchServerId(serverId))

    const { messages, setMessages, channelList, setChannelList } = useChannel(
        serverId,
        channelId,
    )

    return (
        <Server
            messages={messages}
            setMessages={setMessages}
            channelList={channelList}
            setChannelList={setChannelList}
        />
    )
}

export default page
