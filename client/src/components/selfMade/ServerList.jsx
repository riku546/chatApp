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

const ServerList = () => {
    const [serverList, setServerList] = useState([])

    //apiサーバー側にサーバー作成リクエスト送ったあとに、画面上で即時に反映させるための関数
    const addServerToServerList = server => {
        setServerList(prev => [
            ...prev,
            { id: serverList.length + 1, name: server },
        ])
    }

    const getServerList = async () => {
        try {
            const serverList = (await axios.get('/api/all-servers')).data.data

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
            <ScrollArea className="flex-1 w-full ">
                <div className="flex flex-col gap-2 items-center">
                    {console.log(serverList)}
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
            <ServerCreateDialog addServerToServerList={addServerToServerList} />
            <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:cursor-pointer">
                <Compass />
            </div>
        </div>
    )
}

const ServerCreateDialog = ({ addServerToServerList }) => {
    const inputRef = useRef(null)

    const createServer = async () => {
        try {
            await axios.post('/api/server/create', {
                name: inputRef.current.value,
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
                            onClick={() => {
                                createServer()
                                addServerToServerList(inputRef.current.value)
                            }}
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
