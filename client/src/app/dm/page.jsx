'use client'

import { useEffect, useState } from 'react'
import MessageContent from '@/components/selfMade/MessageContent'
import LeftNav from '@/components/selfMade/LeftNav'
import axios from '@/lib/axios'
import ServerList from '@/components/selfMade/ServerList'
import { useSelector } from 'react-redux'

export default function Page() {
    const [messages, setMessages] = useState([])

    const dmId = useSelector(state => state.dmId.value)

    const fetchMessages = async id => {
        try {
            const res = await axios.get(`api/dm/${id}/message`)
            setMessages(res.data.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchMessages(dmId)
    }, [])

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>

            <LeftNav currentWatchDmId={dmId} fetchMessages={fetchMessages} />

            <div className="flex-1">
                <MessageContent
                    messages={messages}
                    setMessages={setMessages}
                    messageType={'dm'}
                    id={dmId}
                />
            </div>
        </div>
    )
}
