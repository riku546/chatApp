import { User } from 'lucide-react'
import React, { useState } from 'react'

const UserList = () => {
    const [userList, setUserList] = useState([
        { name: 'user1', id: 1 },
        { name: 'user2', id: 2 },
    ])

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
