// src/hooks/useDm.js
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useDispatch } from 'react-redux'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'

export default function useDm(dmId) {
    const [messages, setMessages] = useState([])

    // DMのIDをReduxに保存
    const dispatch = useDispatch()
    dispatch(setCurrentWatchDmId(dmId))

    const fetchDmMessage = async id => {
        try {
            const res = await axios.get(`api/dm/${id}/message`)
            setMessages(res.data.data)
        } catch (error) {
            throw error
        }
    }

    // DM内のメッセージを取得
    useEffect(() => {
        fetchDmMessage(dmId)
    }, [])

    return {
        messages,
        setMessages,
        fetchDmMessage,
    }
}
