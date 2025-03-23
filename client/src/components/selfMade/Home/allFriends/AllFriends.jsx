'use client'

import { Avatar } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'

const AllFriends = ({ friendList }) => {
    const friendIcons = useSelector(state => state.friendIcons.value)

    if (!friendIcons) return <p>ロード中</p>

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
                            {friend.set_icon ? (
                                <Image
                                    width={24}
                                    height={24}
                                    src={friendIcons[friend.id]}
                                    alt="Avatar"
                                    objectFit="cover"
                                />
                            ) : (
                                <User size={24} />
                            )}
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
