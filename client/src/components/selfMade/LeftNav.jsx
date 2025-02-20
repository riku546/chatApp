import React from 'react'
import {
    Users,
    RocketIcon as Nitro,
    ShoppingCart,
    Settings,
    User,
    MessageCircle,
    Compass,
    Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

export default function LeftNav({
    currentWatchDmId,
    serverList,
    dmList,
    userInfo,
    fetchMessages,
    setDmId,
}) {
    return (
        <div className="flex">
            <ServerList serverList={serverList} />
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <DmList
                    dmList={dmList}
                    currentWatchDmId={currentWatchDmId}
                    fetchMessages={fetchMessages}
                    setDmId={setDmId}
                />
                <UserFiled userInfo={userInfo} />
            </div>
        </div>
    )
}

const ServerList = ({ serverList }) => {
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

const DmList = ({ dmList, currentWatchDmId, fetchMessages, setDmId }) => {
    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                    ダイレクトメッセージ
                </div>
                {dmList.map(dm => (
                    <div
                        onClick={() => {
                            fetchMessages(dm.dm_id)
                            setDmId(dm.dm_id)
                        }}>
                        {currentWatchDmId === dm.dm_id ? (
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 h-11 bg-[#3e434d]">
                                <User />
                                <span className="text-sm">{dm.name}</span>
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 h-11">
                                <User />
                                <span className="text-sm">{dm.name}</span>
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

const UserFiled = ({ userInfo }) => {
    return (
        <div className="p-2 bg-[#232428] flex items-center gap-2">
            <User></User>
            <div className="flex-1 text-sm">
                <div className="font-medium">{userInfo.name}</div>
            </div>
            <Link
                href={'/dashboard'}
                variant="ghost"
                size="icon"
                className="w-8 h-8 flex items-center justify-center">
                <Settings size={18} />
            </Link>
        </div>
    )
}
