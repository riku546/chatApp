'use client'

import { useEffect, useState } from 'react'
import MessageContent from '@/components/selfMade/MessageContent'
import LeftNav from '@/components/selfMade/LeftNav'
import { useParams } from 'next/navigation'
import axios from '@/lib/axios'
import ServerList from '@/components/selfMade/ServerList'

export default function Page() {
    const [messages, setMessages] = useState([])
    const [dmId, setDmId] = useState(useParams().id)
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

            <LeftNav
                currentWatchDmId={dmId}
                fetchMessages={fetchMessages}
                setDmId={setDmId}
            />
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
