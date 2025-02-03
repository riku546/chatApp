'use client'

import { Users, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import LeftNav from '@/components/selfMade/LeftNav'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import Pending from '@/components/selfMade/Pending'
import axios from '@/lib/axios'

export default function Page() {
    const [friendList, setFriendList] = useState([])
    const [sendFriendRequest, setSendFriendRequest] = useState([])
    const [receiveFriendRequest, setReceiveFriendRequest] = useState([])

    const getFriendList = async () => {
        try {
            const friends = (await axios.get('/api/all-friends')).data.data
            setFriendList(friends)
        } catch (error) {
            throw error
        }
    }

    const getSendFriendRequest = async () => {
        try {
            const friendRequests = (
                await axios.get('/api/friend-request/list/send')
            ).data.data
            setSendFriendRequest(friendRequests)
        } catch (error) {
            throw error
        }
    }

    const getReceiveFriendRequest = async () => {
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
        getFriendList()
        getSendFriendRequest()
        getReceiveFriendRequest()
    }, [])

    //フレンド全員 保留中 フレンド追加ページの切り替えるためのstate
    const [displayType, setDisplayType] = useState('全員')

    const handleDisplayType = type => {
        if (type === '全員') {
            return <AllFriends friendList={friendList} />
        } else if (type === '保留中') {
            return (
                <Pending
                    sendFriendRequest={sendFriendRequest}
                    receiveFriendRequest={receiveFriendRequest}
                />
            )
        } else if (type === 'フレンド追加') {
            return <AddFriend />
        }
    }

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <LeftNav />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="h-12 border-b border-[#1f2023] flex items-center px-4 gap-4">
                    <Users className="w-6 h-6" />
                    <span className="font-medium">フレンド</span>
                    <div className="h-6 border-l border-gray-600" />
                    <Button
                        variant="ghost"
                        onClick={() => setDisplayType('全員')}>
                        全員
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-6 text-sm bg-[#2b2d31]"
                        onClick={() => setDisplayType('保留中')}>
                        保留中
                    </Button>
                    <Button
                        className="bg-green-700"
                        variant="success"
                        size="sm"
                        onClick={() => setDisplayType('フレンド追加')}>
                        フレンドに追加
                    </Button>
                </div>
                <div className="flex-1 p-4">
                    {handleDisplayType(displayType)}
                </div>
            </div>
        </div>
    )
}

const AllFriends = ({ friendList }) => (
    <>
        <div className="text-sm font-medium my-4">
            すべてのフレンド ー <span>{friendList.length}</span>
        </div>
        <div className="space-y-2">
            {friendList.map((friend, i) => (
                <div
                    key={friend.id}
                    className="flex items-center gap-3 p-2  border-t border-zinc-600 hover:bg-[#2b2d31] ">
                    <Avatar className="w-8 h-8 ">
                        <User />
                    </Avatar>
                    <div className="flex-1">
                        <div className="font-medium">
                            オンラインユーザー {i + 1}
                        </div>
                        <div className="text-sm text-gray-400">遊戯中</div>
                    </div>
                </div>
            ))}
        </div>
    </>
)

const AddFriend = () => {
    return (
        <div className="text-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-semibold mb-2">フレンドに追加</h1>
                <p className="text-gray-400 text-sm mb-4">
                    DiscordユーザーIDでフレンドを追加できます。
                </p>

                <div className="flex gap-2">
                    <Input
                        placeholder="DiscordユーザーIDでフレンドを追加できます。"
                        className="flex-1 bg-[#1E1F22] border-none text-gray-100 placeholder:text-gray-500"
                    />
                    <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                        フレンド申請を送信
                    </Button>
                </div>
            </div>
        </div>
    )
}
