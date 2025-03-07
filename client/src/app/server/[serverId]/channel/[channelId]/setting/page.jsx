'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export default function page() {
    const serverId = useParams().serverId
    const channelId = useParams().channelId

    const channelList = useSelector(state => state.channelList.value)

    const currenChannelName = channelList.filter(
        channel => channel.id === Number(channelId),
    )[0].name

    const [channelName, setChannelName] = useState(currenChannelName)

    const handleChangeChannelName = async () => {
        try {
            await axios.put('api/channel/update', {
                name: channelName,
                id: channelId,
            })
        } catch (error) {
            throw error
        }
    }

    const router = useRouter()

    const handleDeleteChannel = async () => {
        try {
            await axios.delete(`api/channel/delete/${channelId}`)

            router.push(`/server/${serverId}/channel/${channelId}`)
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="min-h-screen bg-[#2f3136] text-white font-sans">
            <div className="max-w-3xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-medium">設定</h1>
                    <Button className="rounded-full bg-[#36393f] p-2 hover:bg-[#4f545c] transition-colors">
                        <Link href={`/server/${serverId}/channel/${channelId}`}>
                            <X className="w-5 h-5" />
                        </Link>
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="space-y-10">
                    <div className="space-y-2">
                        <label
                            htmlFor="channel-name"
                            className="block text-sm text-[#b9bbbe]">
                            チャンネル名
                        </label>
                        <div className="flex items-center space-x-4">
                            <Input
                                id="channel-name"
                                type="text"
                                value={channelName}
                                onChange={e => setChannelName(e.target.value)}
                                className="w-full bg-[#202225] text-white p-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                            />
                            <Button
                                onClick={handleChangeChannelName}
                                className="bg-green-700 hover:bg-green-800 hover:cursor-pointer">
                                変更
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p>チャンネルを削除する</p>
                        <ChannelDeleteDialog
                            handleDeleteChannel={handleDeleteChannel}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChannelDeleteDialog = ({ handleDeleteChannel }) => (
    <Dialog>
        <DialogTrigger>
            <Button className="bg-red-700 hover:bg-red-800 hover:cursor-pointer">
                削除
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>チャンネルを削除しますか？</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button
                        onClick={handleDeleteChannel}
                        type="submit"
                        className="bg-red-700">
                        削除
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)
