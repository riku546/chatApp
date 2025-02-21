'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Compass, Plus } from 'lucide-react'
import axios from '@/lib/axios'

const ServerList = () => {
    const [serverList, setServerList] = useState([])

    const getServerList = async () => {
        try {
            const serverList = (await axios.get('/api/user-servers')).data.data

            setServerList(serverList)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getServerList()
    }, [])

    return (
        <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center gap-2 p-2">
            <Link
                className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer"
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}>
                <MessageCircle />
            </Link>
            {/* Server Icons */}
            <ScrollArea className="flex-1 w-full">
                <div className="flex flex-col gap-2 items-center">
                    {serverList.map((server, i) => (
                        <div
                            key={server.id}
                            className="w-12 h-12 bg-[#2b2d31] rounded-full flex items-center justify-center hover:cursor-pointer">
                            <Avatar>
                                <AvatarFallback className="text-xs">
                                    {server.name.substring(0, 3)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    ))}

                    <div className="w-12 h-12 flex items-center justify-center bg-green-700 rounded-full hover:cursor-pointer">
                        <Plus />
                    </div>
                </div>
            </ScrollArea>
            <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer">
                <Compass />
            </div>
        </div>
    )
}

export default ServerList
