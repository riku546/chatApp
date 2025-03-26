'use client'

import Server from '@/components/selfMade/Server/Server'
import { useDispatch } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import useChannel from '@/hooks/page/useChannel'
import { useParams } from 'next/navigation'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'
import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'
import useServerUserIcons from '@/hooks/page/useServerUserIcons'
import { setIsLoadingMessage } from '@/app/store/slice/isLoadingMessage'
import { useEffect } from 'react'

const page = () => {
    useInitialProcess()

    const dispatch = useDispatch()

    const channelId = useParams().channelId
    const serverId = useParams().serverId

    useEffect(() => {
        dispatch(setIsLoadingMessage(true))

        dispatch(setCurrentWatchChannelId(Number(channelId)))
        dispatch(setCurrentWatchServerId(serverId))
    }, [])

    useServerUserIcons(serverId)

    useChannel(serverId, channelId)

    return <Server />
}

export default page
