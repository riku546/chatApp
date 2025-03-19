'use client'

// src/hooks/useDm.js
import { useEffect } from 'react'
import axios from '@/lib/axios'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import { useDispatch } from 'react-redux'
import { setMessage } from '@/app/store/slice/message'

export default function useDm(dmId) {
    // DMのIDをReduxに保存
    const dispatch = useDispatch()
    dispatch(setCurrentWatchDmId(dmId))

    const fetchDmMessage = async id => {
        try {
            const res = await axios.get(`api/dm/${id}/message`)

            dispatch(setMessage(res.data.data))
        } catch (error) {
            throw error
        }
    }

    // DM内のメッセージを取得
    useEffect(() => {
        fetchDmMessage(dmId)
    }, [])
}
