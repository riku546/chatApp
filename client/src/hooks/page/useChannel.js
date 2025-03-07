'use client'

import { useEffect, useState } from 'react'

import axios from '@/lib/axios'
import { useDispatch } from 'react-redux'
import { setChannelList } from '@/app/store/slice/channelList'
import { setMessage } from '@/app/store/slice/message'

const useChannel = (serverId, channelId) => {
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

            dispatch(setMessage(res.data.data))
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
}

export default useChannel
