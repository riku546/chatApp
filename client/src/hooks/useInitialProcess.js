'use client'

import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setServerList } from '../app/store/slice/serverList'
import { setUserInfo } from '../app/store/slice/userInfo'
import { setDmList } from '../app/store/slice/dmList'

const useInitialProcess = () => {
    const dispatch = useDispatch()

    const fetchServerList = async () => {
        try {
            const serverList = (await axios.get('/api/users-servers')).data.data
            console.log(serverList)
            dispatch(setServerList(serverList))
        } catch (error) {
            throw error
        }
    }

    const fetchUserInfo = async () => {
        try {
            const userInfo = (await axios.get('/api/user')).data
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

    const serverList = useSelector(state => state.serverList.value)
    const userInfo = useSelector(state => state.userInfo.value)
    const dmList = useSelector(state => state.dmList.value)

    useEffect(() => {
        const isNotServerListFetched = serverList === null
        if (isNotServerListFetched) fetchServerList()

        const isNotUserInfoFetched = userInfo === null
        if (isNotUserInfoFetched) fetchUserInfo()

        const isNotDmListFetched = dmList === null
        if (isNotDmListFetched) fetchDmList()
    }, [])
}

export default useInitialProcess
