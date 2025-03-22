import React, { use, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, UserRoundPlus } from 'lucide-react'
import axios from '@/lib/axios'
import Image from 'next/image'
import { useSelector } from 'react-redux'

export default function UserDropMenu({
    userName,
    userId,
    setIcon,
    userIconList,
    align,
    alignOffset,
}) {
    const myselfInfo = useSelector(state => state.userInfo.value)

    if (!myselfInfo) return <></>

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    key={userId}
                    className="w-full flex p-2 space-x-4 hover:bg-[#3b3d41] cursor-pointer">
                    {setIcon ? (
                        <Image
                            width={24}
                            height={24}
                            src={
                                myselfInfo.id === userId
                                    ? myselfInfo['icon']
                                    : userIconList[userId]
                            }
                            alt="Avatar"
                            objectFit="cover"
                        />
                    ) : (
                        <User className="w-6" />
                    )}
                    <p className="flex-1 flex justify-start break-all">
                        {userName}
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                alignOffset={alignOffset}
                className="w-52 p-3 flex flex-col space-y-8  bg-[#111214]">
                <UserDataContent
                    userName={userName}
                    userId={userId}
                    setIcon={setIcon}
                    userIconList={userIconList}
                    myselfInfo={myselfInfo}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const UserDataContent = ({
    userName,
    userId,
    setIcon,
    userIconList,
    myselfInfo,
}) => {
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
            const res = await axios.get(`/api/user/${userId}/info`)

            setDescription(res.data.data[0].description)
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
                    {setIcon ? (
                        <Image
                            width={40}
                            height={40}
                            src={
                                myselfInfo.id === userId
                                    ? myselfInfo['icon']
                                    : userIconList[userId]
                            }
                            alt="Avatar"
                            objectFit="cover"
                        />
                    ) : (
                        <User size={40}></User>
                    )}
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
