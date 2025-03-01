'use client'

import React, { useEffect, useState } from 'react'

import Server from '@/components/selfMade/Server/Server'
import axios from '@/lib/axios'
import { useSelector } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'

const page = () => {
    useInitialProcess()

    const [messages, setMessages] = useState([])
    const [channelList, setChannelList] = useState([])
    const [currentWatchChannelId, setCurrentWatchChannelId] = useState(null)

    const serverId = useSelector(state => state.currentWatchServerId.value)

    const fetchChannelList = async () => {
        try {
            const res = await axios.get(`api/server/${serverId}/channels`)

            setChannelList(res.data.data)

            return res.data.data
        } catch (error) {
            throw error
        }
    }

    const fetchChannelMessage = async channelId => {
        try {
            const res = await axios.get(`api/channel/${channelId}/messages`)

            setMessages(res.data.data)
        } catch (error) {
            throw error
        }
    }

    const initializeChannelPage = async () => {
        const channels = await fetchChannelList()

        //サーバを開いたときに、最初に最初に作られたチャンネルが表示されるようにするため
        // 最初のチャンネルのIDを取得する
        //*** api側で、チャンネルが作られた順番で返すようにしている
        const firstChannelId = channels[0].id
        await fetchChannelMessage(firstChannelId)

        setCurrentWatchChannelId(firstChannelId)
    }

    useEffect(() => {
        initializeChannelPage()
    }, [])

    return (
        <Server
            messages={messages}
            setMessages={setMessages}
            channelList={channelList}
            currentWatchChannelId={currentWatchChannelId}
            setChannelList={setChannelList}
        />
    )
}

export default page
