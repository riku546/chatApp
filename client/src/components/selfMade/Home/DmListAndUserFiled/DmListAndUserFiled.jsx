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
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import UserInfoFiled from '../../UserInfoFiled'
import Image from 'next/image'

export default function DmListAndUserFiled() {
    return (
        <div className="w-60 bg-[#2b2d31] flex flex-col">
            <DmList />
            <UserInfoFiled />
        </div>
    )
}

const DmList = () => {
    const dispatch = useDispatch()

    const dmList = useSelector(state => state.dmList.value)

    //アイコンの取得には時間がかかります(cloudflare r2をしようしているので)
    const friendIconList = useSelector(state => state.friendIconList.value)
    if (!friendIconList) return <ScrollArea className="flex-1"></ScrollArea>

    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                    ダイレクトメッセージ
                </div>
                {dmList &&
                    dmList.map(dm => (
                        <Link
                            href={`/dm/${dm.dm_id}`}
                            key={dm.dm_id}
                            onClick={() => {
                                dispatch(setCurrentWatchDmId(dm.dm_id))
                            }}>
                            <Button
                                variant="ghost"
                                className={'w-full justify-start gap-2 h-11 '}>
                                {dm.set_icon ? (
                                    <Image
                                        width={24}
                                        height={24}
                                        src={friendIconList[dm.friend_id]}
                                        alt="Avatar"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <User size={24} />
                                )}
                                <span className="text-sm">
                                    {dm.friend_name}
                                </span>
                                <span className="text-sm">{dm.name}</span>
                            </Button>
                        </Link>
                    ))}
            </div>
        </ScrollArea>
    )
}
