import axios from '@/lib/axios'
import { useState, useEffect } from 'react'

const useLeftNav = () => {
    const [dmList, setDmList] = useState([])
    const [userInfo, setUserInfo] = useState({})

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
        getDmList()
        getUserInfo()
    }, [])

    return { dmList, userInfo }
}

export default useLeftNav
