import axios from '@/lib/axios'
import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserDropMenu from '../../UserDropMenu'

const UserList = ({ serverUserIcons }) => {
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
                <UserDropMenu
                    userName={user.name}
                    userId={user.id}
                    setIcon={user.set_icon}
                    userIconList={serverUserIcons}
                    align={'end'}
                    alignOffset={240}
                />
            ))}
        </div>
    )
}

export default UserList
