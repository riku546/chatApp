'use client'

import { useEffect, useState } from 'react'

import axios from '@/lib/axios'
import { useDispatch } from 'react-redux'
import { setChannelList } from '@/app/store/slice/channelList'

const useChannel = (serverId, channelId) => {
    const [messages, setMessages] = useState([])

    const dispatch = useDispatch()

    const fetchChannelList = async () => {
        try {
            const res = await axios.get(`api/server/${serverId}/channels`)

            dispatch(setChannelList(res.data.data))

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
    }
}

export default useChannel
