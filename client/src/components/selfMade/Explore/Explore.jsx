import React from 'react'
import ServerList from '../ServerList'
import NavBar from './NavBar/NavBar'
import ServerIntroductions from './ServerIntroductions/ServerIntroductions'

const Explore = () => {
    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>
            <NavBar />
            <div className="flex-1">
                <ServerIntroductions></ServerIntroductions>
            </div>
        </div>
    )
}

export default Explore
