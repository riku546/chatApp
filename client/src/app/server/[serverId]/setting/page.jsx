'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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
import useInitialProcess from '@/hooks/useInitialProcess'
import IconChange from '@/components/selfMade/IconChange'
import useServerIcon from '@/hooks/page/useServerIcon'

export default function page() {
    useInitialProcess()

    const serverId = useParams().serverId

    const channelId = useSelector(state => state.currentWatchChannelId.value)

    const serverList = useSelector(state => state.serverList.value)

    const [serverName, setServerName] = useState('')

    const handleChangeServerName = async () => {
        try {
            await axios.put('api/server/update', {
                name: serverName,
                id: serverId,
            })
        } catch (error) {
            throw error
        }
    }

    const router = useRouter()

    const handleDeleteServer = async () => {
        try {
            await axios.delete(`api/server/delete/${serverId}`)

            router.push(`/`)
        } catch (error) {
            throw error
        }
    }

    const [icon, setIcon] = useState(null)

    const { handlePutServerIcon } = useServerIcon()

    const updateServerIcon = async () => {
        if (icon) {
            await handlePutServerIcon(icon, serverId)
        }

        //画像の設定をしたら、reduxのuserInfoのiconを更新するためにページを更新して再fetchする
        location.reload()
    }

    useEffect(() => {
        if (serverList.length === 0) return

        const currentServerInfo = serverList.filter(
            server => server.server_id === Number(serverId),
        )[0]

        setServerName(currentServerInfo.server_name)
        setIcon(currentServerInfo.icon)
    }, [serverList])

    return (
        <div className="min-h-screen bg-[#2f3136] text-white font-sans">
            <div className="max-w-3xl mx-auto p-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-xl font-medium">設定</h1>
                    <Button className="rounded-full bg-[#36393f] p-2 hover:bg-[#4f545c] transition-colors">
                        <Link href={`/server/${serverId}/channel/${channelId}`}>
                            <X className="w-5 h-5" />
                        </Link>
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="space-y-10">
                    <div className="flex space-x-4 items-center">
                        <IconChange icon={icon} setIcon={setIcon} />
                        <Button
                            onClick={updateServerIcon}
                            className="bg-green-700 hover:bg-green-800 hover:cursor-pointer">
                            アイコンを保存
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="channel-name"
                            className="block text-sm text-[#b9bbbe]">
                            サーバー名
                        </label>
                        <div className="flex items-center space-x-4">
                            <Input
                                id="channel-name"
                                type="text"
                                value={serverName}
                                onChange={e => setServerName(e.target.value)}
                                className="w-full bg-[#202225] text-white p-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                            />
                            <Button
                                onClick={handleChangeServerName}
                                className="bg-green-700 hover:bg-green-800 hover:cursor-pointer">
                                変更
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p>サーバーを削除する</p>
                        <ServerDeleteDialog
                            handleDeleteServer={handleDeleteServer}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ServerDeleteDialog = ({ handleDeleteServer }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-800 hover:cursor-pointer">
                削除
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>サーバーを削除しますか？</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        onClick={handleDeleteServer}
                        type="submit"
                        className="bg-red-700">
                        削除
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)
