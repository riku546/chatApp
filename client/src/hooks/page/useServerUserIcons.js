'use client'

import { setServerUserIcons } from '@/app/store/slice/serverUserIcons'
import axios from '@/lib/axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useUserIcon from './useUserIcon'

const useServerUserIcons = serverId => {
    const dispatch = useDispatch()

    const { handleGetUserIcon } = useUserIcon()

    const fetchServerUserIcons = async () => {
        const serverUserIcons = {}

        try {
            const userInServer = (
                await axios.get(`api/server/${serverId}/belongers`)
            ).data.data

            for (const user of userInServer) {
                const icon = await handleGetUserIcon(user.id)

                serverUserIcons[user.id] = icon
            }

            dispatch(setServerUserIcons(serverUserIcons))
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchServerUserIcons()
    }, [])
}

export default useServerUserIcons
