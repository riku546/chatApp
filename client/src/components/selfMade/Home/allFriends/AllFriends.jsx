'use client'

import axios from '@/lib/axios'
import { Avatar } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const AllFriends = () => {
    const [friendList, setFriendList] = useState([])

    const fetchFriendList = async () => {
        try {
            const friends = (await axios.get('api/all-friends')).data.data
            setFriendList(friends)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchFriendList()
    }, [])

    return (
        <>
            <div className="text-sm font-medium my-4">
                すべてのフレンド ー <span>{friendList.length}</span>
            </div>
            <div className="space-y-2">
                {friendList.map((friend, i) => (
                    <div
                        key={friend.id}
                        className="flex items-center gap-3 p-2  border-t border-zinc-600 hover:bg-[#2b2d31] ">
                        <Avatar className="w-8 h-8 flex items-center justify-center">
                            <User />
                        </Avatar>
                        <div className="flex-1">
                            <div className="font-medium">{friend.name} </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllFriends
