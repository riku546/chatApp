'use client'

import { useEffect, useRef } from 'react'

import axios from '@/lib/axios'
import { setChannelList } from '@/app/store/slice/channelList'
import { useDispatch } from 'react-redux'
import { setMessage } from '@/app/store/slice/message'
import { setIsLoadingMessage } from '@/app/store/slice/isLoadingMessage'

const useChannel = (serverId, channelId) => {
    const dispatch = useDispatch()

    const initializedRef = useRef(false)

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

            dispatch(setIsLoadingMessage(false))
        } catch (error) {
            throw error
        }
    }

    const initializeChannelPage = async () => {
        await fetchChannelList()

        await fetchChannelMessage(channelId)
    }

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        initializeChannelPage()
    }, [])
}

export default useChannel
