'use client'

import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import MessageContent from '@/components/selfMade/MessageContent'
import LeftNav from '@/components/selfMade/LeftNav'

export default function Page() {
    // ダミーメッセージ
    const messages = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        userName: i % 2 === 0 ? 'Alice' : 'Bob',
        content: `Message ${i + 1}`,
        timestamp: '2021-10-01 12:34',
    }))

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <LeftNav />
            <div className='flex-1'>
                <MessageContent messages={messages} />
            </div>
        </div>
    )
}
