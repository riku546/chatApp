'use client'

import Server from '@/components/selfMade/Server/Server'
import { useDispatch } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import useChannel from '@/hooks/page/useChannel'
import { useParams } from 'next/navigation'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'
import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'

const page = () => {
    useInitialProcess()

    const dispatch = useDispatch()

    const channelId = useParams().channelId
    dispatch(setCurrentWatchChannelId(Number(channelId)))

    const serverId = useParams().serverId
    dispatch(setCurrentWatchServerId(serverId))

    useChannel(serverId, channelId)

    return <Server />
}

export default page
