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
import useLeftNav from '@/hooks/components/useLeftNav'

export default function DmListAndUserFiled({
    currentWatchDmId,
    fetchMessages,
    setDmId,
}) {
    const { dmList, userInfo } = useLeftNav()

    return (
        <div className="flex">
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

const DmList = ({ dmList, currentWatchDmId }) => {
    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                    ダイレクトメッセージ
                </div>
                {dmList.map(dm => (
                    <Link href={`dm/${dm.dm_id}`} key={dm.dm_id}>
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
                    </Link>
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
