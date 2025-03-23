'use client'

import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServerList } from '../app/store/slice/serverList'
import { setUserInfo } from '../app/store/slice/userInfo'
import { setDmList } from '../app/store/slice/dmList'
import { handleGetIcon } from '@/lib/userIcon'
import { setFriendIcons } from '@/app/store/slice/friendIcons'

const useInitialProcess = () => {
    const dispatch = useDispatch()

    const fetchServerList = async () => {
        try {
            const serverList = (await axios.get('/api/users-servers')).data.data

            

            dispatch(setServerList(serverList))
        } catch (error) {
            throw error
        }
    }

    const fetchUserInfo = async () => {
        try {
            const userInfo = (await axios.get('/api/user/info')).data

            if (userInfo.set_icon) {
                const icon = await handleGetIcon(`user-${userInfo.id}-icon`)
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
                    const icon = await handleGetIcon(`user-${friend.id}-icon`)
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
