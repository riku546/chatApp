'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import MessageContent from '@/components/selfMade/MessageContent'
import LeftNav from '@/components/selfMade/LeftNav'
import { useParams } from 'next/navigation'
import axios from '@/lib/axios'

export default function Page() {
    const [messages, setMessages] = useState([])
    const dmId = useParams().id

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`api/dm/${dmId}/message`)
            setMessages(res.data.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <LeftNav currentWatchDmId={dmId} />
            <div className="flex-1">
                <MessageContent messages={messages} />
            </div>
        </div>
    )
}
