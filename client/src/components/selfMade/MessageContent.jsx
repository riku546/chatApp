'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Pusher from 'pusher-js'
import { pusherApiKey, pusherCluster } from '../../../pusher-env.js'
import axios from '@/lib/axios.js'

export default function MessageContent({
    messages, // サーバーからfetchしたメッセージ
    messageType, // dm or channel
    id /*dm_id or サーバーのチャンネルid */,
}) {
    //websocketで取得したメッセージを保持するためのstate
    const [RealTimeMessages, setRealTimeMessage] = useState([])

    // ページにアクセスした時に自動スクロールするための参照
    const scrollRef = useRef(null)
    useEffect(() => {
        // ページにアクセスした時に一番下までスクロール
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }, [])

    //メッセージの送信
    const messageInputRef = useRef(null)
    const sendMessage = async () => {
        try {
            await axios.post('/api/dm/message/send', {
                dm_id: id,
                content: messageInputRef.current.value,
            })

            messageInputRef.current.value = ''
        } catch (error) {
            throw error
        }
    }

    const handleEnterKey = event => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    useEffect(() => {
        //pusherの設定
        const pusher = new Pusher(pusherApiKey, {
            cluster: pusherCluster,
        })

        //websocketのチャンネルのリッスン
        pusher.subscribe(messageType + id).bind('chat-event', data => {
            setRealTimeMessage(prev => [...prev, data])
        })

        //ページから離れる時にwebsocketのチャンネルから切断
        return () => {
            pusher.unsubscribe(messageType + id)
        }
    }, [])

    return (
        <div className="flex flex-col h-screen bg-[#313338] text-gray-100">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-4">
                    {/* サーバーからfetchしたメッセージ */}
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}

                    {/* websocketで取得したメッセージ */}
                    {RealTimeMessages.map(message => (
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
                            type="text"
                            ref={messageInputRef}
                            onKeyDown={handleEnterKey}
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
