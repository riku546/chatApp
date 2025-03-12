import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserInfoFiled from '../../UserInfoFiled'
import { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addChannelToChannelList } from '@/app/store/slice/channelList'

export default function channelListAndUserFiled({
    channelList,
    setChannelList,
}) {
    return (
        <div className="flex">
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <ChannelList
                    channelList={channelList}
                    setChannelList={setChannelList}
                />
                <UserInfoFiled />
            </div>
        </div>
    )
}

const ChannelList = () => {
    const serverId = useSelector(state => state.currentWatchServerId.value)
    const serverList = useSelector(state => state.serverList.value)

    const serverName = serverList.find(
        server => server.server_id == serverId,
    ).server_name

    const currentWatchChannelId = useSelector(
        state => state.currentWatchChannelId.value,
    )

    const channelList = useSelector(state => state.channelList.value)

    const dispatch = useDispatch()

    return (
        <ScrollArea className="flex-1">
            <div className="space-y-3">
                <div className="flex items-center justify-between shadow-md px-4 py-2">
                    <p className="text-3xl font-sans ">{serverName}</p>
                    <Link href={`/server/${serverId}/setting`}>
                        <Settings className="hover:cursor-pointer" size={20} />
                    </Link>
                </div>
                <div className="p-2 space-y-3">
                    <div className="flex justify-between items-center ">
                        <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                            チャンネル
                        </div>
                        <ChannelCreateDialog />
                    </div>
                    {channelList &&
                        channelList.map(channel => (
                            <Link
                                href={`/server/${serverId}/channel/${channel.id}`}
                                key={channel.id}
                                onClick={() => {
                                    dispatch(
                                        setCurrentWatchChannelId(channel.id),
                                    )
                                }}
                                className="flex justify-between items-center p-3 rounded hover:cursor-pointer"
                                style={{
                                    backgroundColor:
                                        currentWatchChannelId === channel.id
                                            ? '#36393f'
                                            : '',
                                }}>
                                <div key={channel.id}>
                                    <span className="text-sm break-all">
                                        {channel.name}
                                    </span>
                                </div>
                                <div>
                                    <Link
                                        href={`/server/${serverId}/channel/${channel.id}/setting`}>
                                        <Settings size={16} />
                                    </Link>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </ScrollArea>
    )
}

const ChannelCreateDialog = () => {
    const inputRef = useRef(null)

    const serverId = useSelector(state => state.currentWatchServerId.value)

    const dispatch = useDispatch()

    const handleCreateChannel = async () => {
        try {
            const res = await axios.post('api/channel/create', {
                name: inputRef.current.value,
                server_id: serverId,
            })

            const newChannel = res.data.data

            dispatch(addChannelToChannelList(newChannel))
        } catch (error) {
            throw error
        }
    }

    return (
        <Dialog>
            <DialogTrigger className=" hover:cursor-pointer ">
                <Plus size={16} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>チャンネルを作成する</DialogTitle>
                </DialogHeader>
                <Input ref={inputRef} placeholder="チャンネル名" />
                <DialogFooter>
                    <DialogClose>
                        <Button
                            onClick={() => handleCreateChannel()}
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
