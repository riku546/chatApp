'use client'

import LeftNav from '@/components/selfMade/LeftNav'
import Home from '@/components/selfMade/Home/Home'
import ServerList from '@/components/selfMade/ServerList'

export default function Page() {
    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>
            <LeftNav />
            <Home></Home>
        </div>
    )
}
