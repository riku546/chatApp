import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, UserRoundPlus } from 'lucide-react'
import axios from '@/lib/axios'

export default function UserDropMenu({ userName, userId, align, alignOffset }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    key={userId}
                    className="w-full flex p-2 space-x-4 hover:bg-[#3b3d41] cursor-pointer">
                    <User className="w-6" />
                    <p className="flex-1 flex justify-start break-all">
                        {userName}
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                alignOffset={alignOffset}
                className="w-52 p-3 flex flex-col space-y-8  bg-[#111214]">
                <UserDataContent userName={userName} userId={userId} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const UserDataContent = ({ userName, userId }) => {
    const [description, setDescription] = useState('')

    const sendFriendRequest = async () => {
        try {
            await axios.post('/api/friend-request/send', {
                receiver_id: userId,
            })
        } catch (error) {
            throw error
        }
    }

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`/api/user`)
            console.log(res)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
            <div className="w-full flex flex-col space-y-5">
                <div className="flex justify-between ">
                    <User size={40}></User>
                    <UserRoundPlus
                        onClick={sendFriendRequest}
                        size={20}
                        className="hover:cursor-pointer"
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <p className="break-all">{userName}</p>
                    <p>
                        <span>ID </span>
                        {userId}
                    </p>
                </div>
            </div>
            <p>{description}</p>
        </>
    )
}
