'use client'

import React, { useEffect, useState } from 'react'

import axios from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'

const useChannel = (serverId, channelId) => {
    const [messages, setMessages] = useState([])
    const [channelList, setChannelList] = useState([])

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
        await fetchChannelList()

        await fetchChannelMessage(channelId)
    }

    useEffect(() => {
        initializeChannelPage()
    }, [])

    return {
        messages,
        setMessages,
        channelList,
        setChannelList,
    }
}

export default useChannel
