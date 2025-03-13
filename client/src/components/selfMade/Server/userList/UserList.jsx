import axios from '@/lib/axios'
import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
    const [userList, setUserList] = useState([])
    const server_id = useSelector(state => state.currentWatchServerId.value)

    const fetchUserList = async () => {
        try {
            const res = await axios.get(`api/server/${server_id}/belongers`)

            setUserList(res.data.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUserList()
    }, [])

    return (
        <div className="flex flex-col  w-60 bg-[#2b2d31] p-4 ">
            <p className="mb-3">ユーザー</p>
            {userList.map(user => (
                <div
                    key={user.id}
                    className="w-full flex space-x-4 p-2 hover:bg-[#3b3d41] cursor-pointer">
                    <User className="w-6"></User>
                    <p className="flex-1 break-all">{user.name}</p>
                </div>
            ))}
        </div>
    )
}

export default UserList
