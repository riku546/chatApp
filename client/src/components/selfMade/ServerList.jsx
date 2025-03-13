'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Compass, Plus } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import ServerCreateDialog from './ServerCreateDialog'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'

const ServerList = () => {
    const serverList = useSelector(state => state.serverList.value)

    const dispatch = useDispatch()

    return (
        <div className="w-[72px] h-full bg-[#1e1f22] flex flex-col items-center gap-2 p-2">
            <Link
                className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer"
                href={'/'}>
                <MessageCircle />
            </Link>
            {/* Server Icons */}
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-2 items-center">
                    {serverList &&
                        serverList.map((server, i) => (
                            <Link
                                href={`/server/${server.server_id}/channel/${server.channel_id}`}
                                key={server.server_id}
                                onClick={() =>
                                    dispatch(
                                        setCurrentWatchServerId(
                                            server.server_id,
                                        ),
                                    )
                                }
                                className="w-12 h-12 bg-[#2b2d31] rounded-full flex items-center justify-center hover:cursor-pointer">
                                <Avatar>
                                    <AvatarFallback className="text-xs">
                                        {server.server_name.substring(0, 3)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        ))}
                </div>
            </ScrollArea>

            <ServerCreateDialog />

            <Link
                className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer"
                href={'/server/explore'}>
                <Compass />
            </Link>
        </div>
    )
}

export default ServerList
