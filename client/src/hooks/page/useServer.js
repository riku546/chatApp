'use client'

import { setServerUserIcons } from '@/app/store/slice/serverUserIcons'
import axios from '@/lib/axios'
import { handleGetIcon } from '@/lib/userIcon'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useServer = serverId => {
    const dispatch = useDispatch()

    const fetchServerUserIcons = async () => {
        const serverUserIcons = {}

        try {
            const userInServer = (
                await axios.get(`api/server/${serverId}/belongers`)
            ).data.data


            for (const user of userInServer) {
                const icon = await handleGetIcon(`user-${user.id}-icon`)

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

export default useServer
