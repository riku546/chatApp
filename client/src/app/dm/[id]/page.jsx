'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import Dm from '@/components/selfMade/Dm/Dm'
import { useParams } from 'next/navigation'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import useInitialProcess from '@/hooks/useInitialProcess'

export default function Page() {
    useInitialProcess()

    const [messages, setMessages] = useState([])

    //dmのidをurlパラメータから取得して、reduxに保存
    const dmId = useParams().id

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

    useEffect(() => {
        fetchDmMessage(dmId)
    }, [])

    return (
        <Dm
            fetchDmMessage={fetchDmMessage}
            messages={messages}
            setMessages={setMessages}
            dmId={dmId}
        />
    )
}
