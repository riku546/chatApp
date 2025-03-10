import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import UserInfoFiled from '../../UserInfoFiled'
import { HouseWifi } from 'lucide-react'

export default function NavBar() {
    return (
        <div className="flex">
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <Nav />
                <UserInfoFiled />
            </div>
        </div>
    )
}

const Nav = () => {
    return (
        <div className="flex-1">
            <div className=" space-y-4">
                <div className="p-3 shadow-md">
                    <p className="text-xl font-bold text-gray-300">発見</p>
                </div>
                <div className='p-3'>
                    <div className="flex items-center space-x-3 p-3 bg-[#3c3d44] rounded">
                        <HouseWifi size={30} />
                        <p className="text-lg">サーバー</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
