'use client'

import { User, CircleCheck, CircleX } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import axios from '@/lib/axios'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

export default function Pending() {
    const [sendFriendRequest, setSendFriendRequest] = useState([])
    const [receiveFriendRequest, setReceiveFriendRequest] = useState([])
    const fetchSendFriendRequest = async () => {
        try {
            const friendRequests = (
                await axios.get('/api/friend-request/list/send')
            ).data.data
            setSendFriendRequest(friendRequests)
        } catch (error) {
            throw error
        }
    }

    const fetchReceiveFriendRequest = async () => {
        try {
            const friendRequests = (
                await axios.get('/api/friend-request/list/receive')
            ).data.data
            setReceiveFriendRequest(friendRequests)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchSendFriendRequest()
        fetchReceiveFriendRequest()
    }, [])

    return (
        <div>
            <FriendRequestList
                friendRequestType={'receive'}
                friendRequests={receiveFriendRequest}
            />
            <FriendRequestList
                friendRequestType={'send'}
                friendRequests={sendFriendRequest}
            />
        </div>
    )
}

const FriendRequestList = ({ friendRequestType, friendRequests }) => {
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
                            <ReceiveButtons senderId={user.id} />
                        ) : (
                            <SendButtons receiverId={user.id} />
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

const ReceiveButtons = ({ senderId }) => {
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
                onClick={() => rejectFriendRequest(senderId)}
            />
            <CircleCheck
                color="#46b937"
                className="hover:cursor-pointer "
                onClick={() => acceptFriendRequest(senderId)}
            />
        </div>
    )
}

const SendButtons = ({ receiverId }) => {
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
                onClick={() => cancelFriendRequest(receiverId)}
            />
        </div>
    )
}
