'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Compass, Plus } from 'lucide-react'
import axios from '@/lib/axios'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { addServerToServerList } from '@/app/store/slice/serverList'

const ServerList = () => {
    const serverList = useSelector(state => state.serverList.value)

    return (
        <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center gap-2 p-2">
            <Link
                className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer"
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}>
                <MessageCircle />
            </Link>
            {/* Server Icons */}
            <ScrollArea className="flex-1 w-full ">
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
                </div>
            </ScrollArea>

            <ServerCreateDialog serverList={serverList} />

            <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer">
                <Compass />
            </div>
        </div>
    )
}

const ServerCreateDialog = ({ serverList }) => {
    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const handleCreateServer = async () => {
        createServer()

        createChannel()

        joinServer()
    }

    const createChannel = async () => {
        try {
            await axios.post('api/channel/create', {
                name: '一般',
            })
        } catch (error) {
            throw error
        }
    }

    const joinServer = async () => {
        try {
            await axios.post('api/server/join', {
                server_id: serverList.length + 1,
            })
        } catch (error) {
            throw error
        }
    }

    const createServer = async () => {
        try {
            const serverName = inputRef.current.value
            //データベースに新しいサーバーを登録
            await axios.post('/api/server/create', {
                name: serverName,
            })

            //reduxで管理しているサーバーリストに新しいサーバーを追加
            dispatch(addServerToServerList(serverName))
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
                            onClick={() => handleCreateServer()}
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

export default ServerList
