'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, User } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function MessageContent({ messages }) {
    // ページにアクセスした時に自動スクロールするための参照
    const scrollRef = useRef(null)

    useEffect(() => {
        // ページにアクセスした時に一番下までスクロール
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }, [])

    return (
        <div className="flex flex-col h-screen bg-[#313338] text-gray-100">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-4">
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                    <div ref={scrollRef}></div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#313338] border-t border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <Input
                            placeholder="メッセージを送信"
                            className="bg-[#383A40] border-none text-gray-100 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Message({ message }) {
    //メッセージの作成日時から秒を削除する
    //引数 2022-01-01 10:00:00
    //返り値 2022-01-01 10:00
    const formattedTimestamp = () => {
        const splitTimestamp = message.created_at.split(':')
        return splitTimestamp[0] + ':' + splitTimestamp[1]
    }

    return (
        <div className="flex items-start gap-4 group">
            <Avatar className="w-10 h-10">
                <User />
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{message.name}</span>
                    <span className="text-xs text-gray-400">
                        {formattedTimestamp(message.created_at)}
                    </span>
                </div>
                <div className="mt-1 text-gray-100 whitespace-pre-line">
                    {message.content}
                </div>
            </div>
        </div>
    )
}
