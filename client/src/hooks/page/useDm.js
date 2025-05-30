'use client'

import { useEffect, useRef } from 'react'
import axios from '@/lib/axios'
import { useDispatch } from 'react-redux'
import { setMessage } from '@/app/store/slice/message'
import { setIsLoadingMessage } from '@/app/store/slice/isLoadingMessage'

export default function useDm(dmId) {
    const dispatch = useDispatch()

    const initializedRef = useRef(false)

    const fetchDmMessage = async id => {
        try {
            const res = await axios.get(`api/dm/${id}/message`)

            dispatch(setMessage(res.data.data))

            dispatch(setIsLoadingMessage(false))

        } catch (error) {
            throw error
        }
    }

    // DM内のメッセージを取得
    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        fetchDmMessage(dmId)
    }, [])
}
