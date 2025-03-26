'use client'

import React, { useEffect, useRef, useState } from 'react'
import AllFriends from './allFriends/AllFriends'
import Pending from './pending/Pending'
import AddFriend from './addFriend/AddFriend'
import HomeHeader from './HomeHeader/HomeHeader'
import DmListAndUserFiled from './DmListAndUserFiled/DmListAndUserFiled'
import ServerList from '../ServerList'
import axios from '@/lib/axios'
import BottomNav from '../Responsive/BottomNav/BottomNav'
import ServerDrawer from '../Responsive/BottomNav/ServerDrawer'
import DmDrawer from '../Responsive/BottomNav/DmDrawer'

const Home = () => {
    //フレンド全員 保留中 フレンド追加ページの切り替えるためのstate
    const [displayType, setDisplayType] = useState('全員')

    const [friendList, setFriendList] = useState([])

    const initializedRef = useRef(false)

    const changeDisplayType = type => {
        setDisplayType(type)
    }

    const handleDisplayType = type => {
        if (type === '全員') {
            return <AllFriends friendList={friendList} />
        } else if (type === '保留中') {
            return <Pending />
        } else if (type === 'フレンド追加') {
            return <AddFriend />
        }
    }

    const fetchFriendList = async () => {
        try {
            const friends = (await axios.get('api/all-friends')).data.data
            setFriendList(friends)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        fetchFriendList()
    }, [])

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#313338] text-gray-100">
            <div className="hidden md:block">
                <ServerList />
            </div>

            <div className="hidden md:flex">
                <DmListAndUserFiled />
            </div>

            <div className=" flex-1 flex-col">
                <HomeHeader changeDisplayType={changeDisplayType}></HomeHeader>
                <div className=" p-4 overflow-y-auto scrollbar">
                    {handleDisplayType(displayType)}
                </div>
            </div>

            <BottomNav>
                <ServerDrawer />
                <DmDrawer />
            </BottomNav>
        </div>
    )
}

export default Home
