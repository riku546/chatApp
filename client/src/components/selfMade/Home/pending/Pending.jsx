'use client'

import { User, CircleCheck, CircleX } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import axios from '@/lib/axios'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useRef, useState } from 'react'

export default function Pending() {
    const [sendFriendRequests, setSendFriendRequests] = useState([])
    const [receiveFriendRequests, setReceiveFriendRequests] = useState([])

    const initializedRef = useRef(false)

    const fetchSendFriendRequest = async () => {
        try {
            const friendRequests = (
                await axios.get('/api/friend-request/list/send')
            ).data.data

            setSendFriendRequests(friendRequests)
        } catch (error) {
            throw error
        }
    }

    const fetchReceiveFriendRequest = async () => {
        try {
            const friendRequests = (
                await axios.get('/api/friend-request/list/receive')
            ).data.data
            setReceiveFriendRequests(friendRequests)
        } catch (error) {
            throw error
        }
    }

    //フレンド申請拒否・承認後のフレンドリクエストの更新
    const updateReceivedFriendRequest = userId => {
        const filteredData = receiveFriendRequests.filter(
            item => item.id !== userId,
        )
        setReceiveFriendRequests(filteredData)
    }

    //フレンド申請キャンセル後にフレンドリクエストの更新
    const updateSendFriendRequest = userId => {
        const filteredData = sendFriendRequests.filter(
            item => item.id !== userId,
        )
        setSendFriendRequests(filteredData)
    }

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        fetchSendFriendRequest()
        fetchReceiveFriendRequest()
    }, [])

    return (
        <>
            <FriendRequestList
                friendRequestType={'receive'}
                friendRequests={receiveFriendRequests}
                updateFriendRequest={updateReceivedFriendRequest}
            />
            <FriendRequestList
                friendRequestType={'send'}
                friendRequests={sendFriendRequests}
                updateFriendRequest={updateSendFriendRequest}
            />
        </>
    )
}

const FriendRequestList = ({
    friendRequestType,
    friendRequests,
    updateFriendRequest,
}) => {
    return (
        <>
            <div className="text-sm font-semibold text-gray-400 mb-2 pb-1 border-b border-zinc-600">
                {friendRequestType} ー <span>{friendRequests.length}</span>
            </div>
            <div className="space-y-2">
                {friendRequests.map(user => (
                    <div
                        key={user.id}
                        className="flex items-center gap-3 p-2 hover:bg-[#2b2d31] rounded">
                        <Avatar className="w-8 h-8">
                            <User />
                        </Avatar>
                        <div className="flex flex-1 h-8 space-x-10">
                            <div className="font-medium">{user.name}</div>
                        </div>
                        {friendRequestType === 'receive' ? (
                            <ReceiveButtons
                                senderId={user.id}
                                updateFriendRequest={updateFriendRequest}
                            />
                        ) : (
                            <SendButtons
                                receiverId={user.id}
                                updateFriendRequest={updateFriendRequest}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

const ReceiveButtons = ({ senderId, updateFriendRequest }) => {
    const acceptFriendRequest = async senderId => {
        try {
            const newUuid = uuidv4()
            await axios.post('api/dm/create', {
                dm_id: newUuid,
            })

            await axios.post('/api/friend-request/accept', {
                sender_id: senderId,
                dm_id: newUuid,
            })
        } catch (error) {
            throw error
        }
    }

    const rejectFriendRequest = async senderId => {
        try {
            await axios.delete(`/api/friend-request/reject/${senderId}`)
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="flex space-x-4">
            <CircleX
                className="hover:cursor-pointer"
                onClick={() => {
                    rejectFriendRequest(senderId)
                    updateFriendRequest(senderId)
                }}
            />
            <CircleCheck
                color="#46b937"
                className="hover:cursor-pointer "
                onClick={() => {
                    acceptFriendRequest(senderId)
                    updateFriendRequest(senderId)
                }}
            />
        </div>
    )
}

const SendButtons = ({ receiverId, updateFriendRequest }) => {
    const cancelFriendRequest = async receiverId => {
        try {
            await axios.delete(`/api/friend-request/cancel/${receiverId}`)
        } catch (error) {
            console.error('Failed to cancel friend request', error)
            throw error
        }
    }
    return (
        <div className="flex space-x-4">
            <CircleX
                className="hover:cursor-pointer "
                onClick={() => {
                    cancelFriendRequest(receiverId)
                    updateFriendRequest(receiverId)
                }}
            />
        </div>
    )
}
