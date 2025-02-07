import axios from '@/lib/axios'
import { useState, useEffect } from 'react'

const useLeftNav = () => {
    const [serverList, setServerList] = useState([])
    const [dmList, setDmList] = useState([])
    const [userInfo, setUserInfo] = useState({})

    const getServerList = async () => {
        try {
            const serverList = (await axios.get('/api/user-servers')).data.data

            setServerList(serverList)
        } catch (error) {
            throw error
        }
    }

    const getDmList = async () => {
        try {
            const dmList = (await axios.get('/api/dm-list')).data.data
            setDmList(dmList)
        } catch (error) {
            throw error
        }
    }

    const getUserInfo = async () => {
        try {
            const userInfo = (await axios.get('/api/user')).data
            setUserInfo(userInfo)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getServerList()
        getDmList()
        getUserInfo()
    }, [])

    return { serverList, dmList, userInfo }
}

export default useLeftNav
