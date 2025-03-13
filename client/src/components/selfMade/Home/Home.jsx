'use client'

import React, { useState } from 'react'
import AllFriends from './allFriends/AllFriends'
import Pending from './pending/Pending'
import AddFriend from './addFriend/AddFriend'
import HomeHeader from './HomeHeader/HomeHeader'
import DmListAndUserFiled from './DmListAndUserFiled/DmListAndUserFiled'
import ServerList from '../ServerList'

const Home = () => {
    //フレンド全員 保留中 フレンド追加ページの切り替えるためのstate
    const [displayType, setDisplayType] = useState('全員')

    const changeDisplayType = type => {
        setDisplayType(type)
    }

    const handleDisplayType = type => {
        if (type === '全員') {
            return <AllFriends />
        } else if (type === '保留中') {
            return <Pending />
        } else if (type === 'フレンド追加') {
            return <AddFriend />
        }
    }

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList />

            <DmListAndUserFiled />

            <div className=" flex-1 flex-col">
                <HomeHeader changeDisplayType={changeDisplayType}></HomeHeader>
                <div className=" p-4">
                    {handleDisplayType(displayType)}
                </div>
            </div>
        </div>
    )
}

export default Home
