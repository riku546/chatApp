'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import ServerList from '@/components/selfMade/ServerList'
import { useSelector } from 'react-redux'
import Dm from '@/components/selfMade/Dm/Dm'

export default function Page() {
    const [messages, setMessages] = useState([])

    const dmId = useSelector(state => state.dmId.value)

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
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>

            <Dm
                fetchDmMessage={fetchDmMessage}
                messages={messages}
                setMessages={setMessages}
                dmId={dmId}></Dm>
        </div>
    )
}
