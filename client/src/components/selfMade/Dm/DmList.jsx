import React, { useContext, useState } from 'react'
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
import useMessage from '@/hooks/useMessage'
import useDmId from '@/hooks/useDmId'
import { MessageContext } from '@/context/message/messageContext'

export default function DmList({ setPageType }) {
    

    const { dmList, userInfo } = useLeftNav()
    const dmId = 'ddd'

    const { fetchMessages } = useMessage()

    return (
        <div className="w-60 bg-[#2b2d31] flex flex-col">
            <ScrollArea className="flex-1">
                <div className="p-2">
                    <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                        ダイレクトメッセージ
                    </div>
                    {dmList.map(dm => (
                        <div
                            key={dm.dm_id}
                            onClick={() => {
                                fetchMessages(dm.dm_id)
                                // setDmId(dm.dm_id)
                                setPageType('dm')
                            }}>
                            {states.dmId === dm.dm_id ? (
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
        </div>
    )
}
