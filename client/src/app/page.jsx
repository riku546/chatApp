'use client'

import Home from '@/components/selfMade/Home/Home'
import ServerList from '@/components/selfMade/ServerList'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setServerList } from './store/slice/serverList'
import { setUserInfo } from './store/slice/userInfo'
import { setDmList } from './store/slice/dmList'

export default function Page() {
    const dispatch = useDispatch()

    const fetchServerList = async () => {
        try {
            const serverList = (await axios.get('/api/all-servers')).data.data
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

    useEffect(() => {
        fetchServerList()

        fetchUserInfo()

        fetchDmList()
    }, [])

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>
            <Home></Home>
        </div>
    )
}
