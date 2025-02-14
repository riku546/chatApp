'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Input } from '@/components/ui/input'
import { Ellipsis, ImageIcon, User } from 'lucide-react'

import {
    useAutoScroll,
    useFetchUserId,
    useSendMessage,
} from '@/hooks/components/MessageContent.jsx'
import { usePusher } from '@/hooks/usePusher.js'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import { useState } from 'react'

export default function MessageContent({
    messages, // サーバーからfetchしたメッセージ
    setMessages,
    messageType, // dm or channel
    id /*dm_id or サーバーのチャンネルid */,
}) {
    const userId = useFetchUserId()
    const scrollRef = useAutoScroll(messages)
    usePusher(messageType, id, setMessages)
    const { messageInputRef, handleEnterKey } = useSendMessage(id)

    return (
        <div className="flex flex-col h-screen bg-[#313338] text-gray-100">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-6">
                <div className="space-y-8">
                    {messages.map(message => (
                        <Message
                            key={message.created_at}
                            message={message}
                            userId={userId}
                        />
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

function Message({ message, userId }) {
    const [isEditing, setIsEditing] = useState(false)

    //メッセージの作成日時から秒を削除する
    //引数 2022-01-01 10:00:00
    //返り値 2022-01-01 10:00
    const formattedTimestamp = () => {
        const splitTimestamp = message.created_at.split(':')
        return splitTimestamp[0] + ':' + splitTimestamp[1]
    }

    return (
        <div className="flex  items-start gap-4 group">
            <Avatar className="flex justify-center items-center">
                <User />
            </Avatar>
            <div className="flex flex-1 justify-between items-center px-2 py-1">
                <div className="w-9/12">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{message.name}</span>
                        <span className="text-xs text-gray-400">
                            {formattedTimestamp(message.created_at)}
                        </span>
                    </div>
                    <div className="mt-1 text-gray-100 whitespace-pre-line  break-words">
                        {message.content}
                    </div>
                </div>
                <div>{console.log(message.id)}
                    {/* message.idはメッセージを投稿したユーザーのid  */}
                    {message.id === userId && <MessageOperations />}
                </div>
            </div>
        </div>
    )
}

const EditingFiled = ({ message }) => {
    return (
        <div>
            <input
                className="mt-1 text-gray-100 border-none bg-gray-700 p-2 rounded whitespace-pre-line  break-words"
                type="text"
                value={message.content}
            />
            <div className="mt-1 text-gray-100 bg-gray-700 p-2 rounded whitespace-pre-line  break-words">
                {message.content}
            </div>
            <div className="flex items-center space-x-3 mt-2">
                <p className="text-gray-400 text-xs">
                    Escキーで
                    <span className="text-sky-500">キャンセル</span>
                </p>
                <p className="text-gray-400 text-xs">
                    Enterキーで
                    <span className="text-sky-500">保存</span>
                </p>
            </div>
        </div>
    )
}

const MessageOperations = () => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Ellipsis className="hover:cursor-pointer" size={20} />
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col space-y-4 p-2 bg-[#383A40] rounded-md">
                    <div className="flex items-center  hover:cursor-pointer">
                        <span>メッセージを編集</span>
                    </div>
                    <div className="flex items-center ">
                        <span className="text-red-600 hover:cursor-pointer">
                            メッセージを削除
                        </span>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
