'use client'

import { Avatar } from '@/components/ui/avatar'

import { Input } from '@/components/ui/input'
import { Ellipsis, User } from 'lucide-react'

import {
    useAutoScroll,
    useFetchUserId,
} from '@/hooks/components/MessageContent.jsx'
import { usePusher } from '@/hooks/usePusher.js'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import { use, useState } from 'react'
import axios from '@/lib/axios'
import { useSelector } from 'react-redux'

export default function MessageContent({
    messages, // apサーバーからfetchしたメッセージ
    setMessages,
    messageType, // dm or channel
    id /*dm_id or チャンネルid */,
    useMessageCustomHook,
    useOperationMessageCustomHook,
}) {
    const userId = useFetchUserId()
    const scrollRef = useAutoScroll(messages)
    usePusher(messageType, id, setMessages)
    const { messageInputRef, handleEnterKey } = useMessageCustomHook(id)

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
                            useOperationMessageCustomHook={
                                useOperationMessageCustomHook
                            }
                        />
                    ))}

                    <div ref={scrollRef}></div>
                </div>
            </div>
            <InputArea
                messageInputRef={messageInputRef}
                handleEnterKey={handleEnterKey}
            />
        </div>
    )
}

const InputArea = ({ messageInputRef, handleEnterKey }) => {
    return (
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
    )
}

function Message({ message, userId, useOperationMessageCustomHook }) {
    const [isEditing, setIsEditing] = useState(false)
    const [messageContent, setMessageContent] = useState(message.content)

    const handleMessageArea = () => {
        if (isEditing) {
            //メッセージの編集キャンセル時に必要な前回のメッセージを保存
            localStorage.setItem('previousMessage', message.content)

            return (
                <EditingFiled
                    message={messageContent}
                    created_at={message.created_at}
                    setMessageContent={setMessageContent}
                    setIsEditing={setIsEditing}
                    useOperationMessageCustomHook={
                        useOperationMessageCustomHook
                    }
                />
            )
        } else {
            return messageContent
        }
    }

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
                    <div className="w-4/5  mt-1 text-gray-100 whitespace-pre-line  break-words">
                        {handleMessageArea()}
                    </div>
                </div>
                <div>
                    {/* message.idはメッセージを投稿したユーザーのid  */}
                    {message.user_id === userId && (
                        <MessageOperations
                            setIsEditing={setIsEditing}
                            useOperationMessageCustomHook={
                                useOperationMessageCustomHook
                            }
                            created_at={message.created_at}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const EditingFiled = ({
    message,
    created_at,
    setMessageContent,
    setIsEditing,
    useOperationMessageCustomHook,
}) => {
    const { handleEditMessage } = useOperationMessageCustomHook()

    return (
        <div className="w-full">
            <input
                className="w-full mt-1 text-gray-100 border-none bg-[#383a40] p-2 rounded whitespace-pre-line  break-words"
                type="text"
                value={message}
                onChange={e => setMessageContent(e.target.value)}
            />

            <div className="flex items-center space-x-3 mt-2">
                <p
                    onClick={() => {
                        setMessageContent(
                            localStorage.getItem('previousMessage'),
                        )
                        setIsEditing(false)
                    }}
                    className="text-gray-400 text-xs hover:cursor-pointer">
                    キャンセル
                </p>
                <p
                    onClick={() => {
                        setIsEditing(false)
                        handleEditMessage(message, created_at)
                    }}
                    className="text-xs text-sky-500 hover:cursor-pointer ">
                    保存
                </p>
            </div>
        </div>
    )
}

const MessageOperations = ({
    setIsEditing,
    useOperationMessageCustomHook,
    created_at,
}) => {
    const { handleDeleteMessage } = useOperationMessageCustomHook()

    return (
        <HoverCard>
            <HoverCardTrigger>
                <Ellipsis className="hover:cursor-pointer" size={20} />
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col space-y-4 p-2 bg-[#383A40] rounded-md">
                    <div
                        onClick={() => setIsEditing(true)}
                        className="flex items-center  hover:cursor-pointer">
                        <span>メッセージを編集</span>
                    </div>
                    <div
                        onClick={() => handleDeleteMessage(created_at)}
                        className="flex items-center">
                        <span className="text-red-600 hover:cursor-pointer">
                            メッセージを削除
                        </span>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
