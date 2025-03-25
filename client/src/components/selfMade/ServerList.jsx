'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Compass, Plus } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWatchServerId } from '@/app/store/slice/currentWatchServerId'
import Image from 'next/image'
import { addServerToServerList } from '@/app/store/slice/serverList'
import axios from '@/lib/axios'
import { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'

export default function ServerList() {
    const serverList = useSelector(state => state.serverList.value)

    const dispatch = useDispatch()

    return (
        <div className="flex w-[72px] h-full bg-[#1e1f22]  flex-col items-center gap-2 p-2">
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
                                {server.set_icon ? (
                                    <Image
                                        width={50}
                                        height={50}
                                        src={server.icon}
                                        alt="Avatar"
                                        objectFit="cover"
                                        className="rounded-full"></Image>
                                ) : (
                                    <Avatar>
                                        <AvatarFallback className="text-xs">
                                            {server.server_name.substring(0, 3)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
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

const ServerCreateDialog = () => {
    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const createServerFacade = async () => {
        const newServerName = inputRef.current.value

        const newServerId = await createServer(newServerName)

        await joinServer(newServerId)

        const newChannelId = await createChannel(newServerId)

        //reduxで管理しているサーバーリストに新しいサーバーを追加
        dispatch(
            addServerToServerList({
                server_name: newServerName,
                server_id: newServerId,
                channel_id: newChannelId,
            }),
        )
    }

    const createServer = async serverName => {
        try {
            const res = await axios.post('/api/server/create', {
                name: serverName,
            })

            const newServerId = res.data.data.id

            return newServerId
        } catch (error) {
            throw error
        }
    }

    const createChannel = async newServerId => {
        try {
            const res = await axios.post('api/channel/create', {
                name: '一般',
                server_id: newServerId,
            })

            const channelId = res.data.data.id

            return channelId
        } catch (error) {
            throw error
        }
    }

    const joinServer = async newServerId => {
        try {
            await axios.post('api/server/join', {
                server_id: newServerId,
            })
        } catch (error) {
            throw error
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full hover:cursor-pointer ">
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>サーバーを作成する</DialogTitle>
                </DialogHeader>
                <Input ref={inputRef} placeholder="サーバー名" />
                <DialogFooter>
                    <DialogClose>
                        <Button
                            onClick={() => createServerFacade()}
                            type="submit"
                            className="bg-[#5865f2]">
                            作成
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
