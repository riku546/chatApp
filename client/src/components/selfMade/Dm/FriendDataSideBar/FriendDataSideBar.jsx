import axios from '@/lib/axios'
import { User } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const FriendDataSideBar = () => {
    const [friendInfo, setFriendInfo] = React.useState({})

    const initializedRef = useRef(false)

    const dmId = useSelector(state => state.currentWatchDmId.value)

    const fetchFriendInfo = async () => {
        try {
            const res = await axios.get(`api/dm/${dmId}/get-friend-info`)

            setFriendInfo(res.data.data[0])
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        fetchFriendInfo()
    }, [])

    //アイコンの取得には時間がかかります(cloudflare r2をしようしているので)
    const friendIcons = useSelector(state => state.friendIcons.value)
    if (!friendIcons)
        return (
            <div className="flex flex-col  w-80 bg-[#282834] px-6 py-10 space-y-8"></div>
        )

    return (
        <div className="flex flex-col  w-80 bg-[#282834] px-6 py-10 space-y-8">
            {friendInfo.set_icon ? (
                <Image
                    width={50}
                    height={50}
                    src={friendIcons[friendInfo.id]}
                    alt="Avatar"
                    objectFit="cover"
                />
            ) : (
                <User size={50}></User>
            )}
            <div className="flex flex-col space-y-2">
                <p>{friendInfo.name}</p>

                <p>
                    <span>ID </span>
                    {friendInfo.id}
                </p>
            </div>
            <div className="bg-[#1e1e24] p-4 rounded">
                <p className="text-sm  text-gray-400">自己紹介文</p>
                <p>{friendInfo.description}</p>
            </div>
        </div>
    )
}

export default FriendDataSideBar
