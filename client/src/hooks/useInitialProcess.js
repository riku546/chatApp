'use client'

import axios from '@/lib/axios'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServerList } from '../app/store/slice/serverList'
import { setUserInfo } from '../app/store/slice/userInfo'
import { setDmList } from '../app/store/slice/dmList'
import { setFriendIcons } from '@/app/store/slice/friendIcons'
import useUserIcon from './page/useUserIcon'
import useServerIcon from './page/useServerIcon'

const useInitialProcess = () => {
    const dispatch = useDispatch()

    const { handleGetUserIcon } = useUserIcon()

    const { handleGetServerIcon } = useServerIcon()

    const initializedRef = useRef(false)

    const fetchServerList = async () => {
        try {
            const serverList = (await axios.get('/api/users-servers')).data.data

            for (const server of serverList) {
                if (server.set_icon) {
                    const icon = await handleGetServerIcon(server.server_id)
                    server['icon'] = icon
                }
            }

            dispatch(setServerList(serverList))
        } catch (error) {
            throw error
        }
    }

    const fetchUserInfo = async () => {
        try {
            const userInfo = (await axios.get('/api/user/info')).data

            if (userInfo.set_icon) {
                const icon = await handleGetUserIcon(userInfo.id)
                userInfo['icon'] = icon
            }

            dispatch(setUserInfo(userInfo))
        } catch (error) {
            throw error
        }
    }

    const fetchDmList = async () => {
        try {
            const dmList = (await axios.get('/api/dm-list')).data.data

            dispatch(setDmList(dmList))
        } catch (error) {
            throw error
        }
    }

    const fetchFriendIcons = async () => {
        const friendIconList = {}

        try {
            const friendList = (await axios.get('api/all-friends')).data.data

            for (const friend of friendList) {
                if (friend.set_icon) {
                    const icon = await handleGetUserIcon(friend.id)
                    friendIconList[friend.id] = icon
                }
            }

            dispatch(setFriendIcons(friendIconList))
        } catch (error) {
            throw error
        }
    }

    const serverList = useSelector(state => state.serverList.value)
    const userInfo = useSelector(state => state.userInfo.value)
    const dmList = useSelector(state => state.dmList.value)
    const friendIcons = useSelector(state => state.friendIcons.value)

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        const isNotServerListFetched = serverList.length === 0
        if (isNotServerListFetched) fetchServerList()

        const isNotUserInfoFetched = userInfo === null
        if (isNotUserInfoFetched) fetchUserInfo()

        const isNotDmListFetched = dmList.length === 0
        if (isNotDmListFetched) fetchDmList()

        const isNotFriendIconsFetched = friendIcons === null
        if (isNotFriendIconsFetched) fetchFriendIcons()
    }, [])
}

export default useInitialProcess
