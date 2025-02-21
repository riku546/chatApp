'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import MessageContent from '@/components/selfMade/MessageContent'
import LeftNav from '@/components/selfMade/LeftNav'
import { useParams } from 'next/navigation'
import axios from '@/lib/axios'
import useLeftNav from '@/hooks/components/useLeftNav'

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
