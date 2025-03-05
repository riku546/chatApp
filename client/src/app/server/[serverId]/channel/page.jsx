'use client'

import Server from '@/components/selfMade/Server/Server'
import { useDispatch, useSelector } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import useChannel from '@/hooks/page/useChannel'
import { useParams } from 'next/navigation'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'

const page = () => {
    useInitialProcess()

    const serverId = useParams().serverId
    const dispatch = useDispatch()
    dispatch(setCurrentWatchServerId(serverId))

    const { messages, setMessages, channelList, setChannelList } = useChannel()

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
