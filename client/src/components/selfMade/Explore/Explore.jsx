import React from 'react'

const Explore = () => {
    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>
            <DmListAndUserFiled />
            <div className="flex-1"></div>
        </div>
    )
}

export default Explore
