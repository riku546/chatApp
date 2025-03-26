import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { MessageCircle, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function DmDrawer() {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <MessageCircle size={28} />
                    <p className="text-xs text-gray-400">DM</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="h-screen w-52 border-none bg-[#2b2d31]">
                <DmList />
            </DrawerContent>
        </Drawer>
    )
}

const DmList = () => {
    const dispatch = useDispatch()

    const dmList = useSelector(state => state.dmList.value)

    //アイコンの取得には時間がかかります(cloudflare r2をしようしているので)
    const friendIcons = useSelector(state => state.friendIcons.value)
    if (!friendIcons) return <ScrollArea className="flex-1"></ScrollArea>

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
                                        width={35}
                                        height={35}
                                        src={friendIcons[dm.friend_id]}
                                        alt="Avatar"
                                        objectFit="cover"
                                        className="rounded-full"
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
