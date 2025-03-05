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

const ChannelList = ({ channelList, setChannelList }) => {
    const serverId = useSelector(state => state.currentWatchServerId.value)

    const currentWatchChannelId = useSelector(
        state => state.currentWatchChannelId.value,
    )

    const dispatch = useDispatch()

    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="flex justify-between items-center ">
                    <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                        チャンネル
                    </div>
                    <ChannelCreateDialog setChannelList={setChannelList} />
                </div>
                {channelList.map(channel => (
                    <div
                        className="flex justify-between items-center p-3 rounded hover:cursor-pointer"
                        style={{
                            backgroundColor:
                                currentWatchChannelId === channel.id
                                    ? '#36393f'
                                    : '',
                        }}>
                        <Link
                            href={`/server/${serverId}/channel`}
                            key={channel.id}
                            onClick={() =>
                                dispatch(setCurrentWatchChannelId(channel.id))
                            }>
                            <span className="text-sm break-all">
                                {channel.name}
                            </span>
                        </Link>
                        <Link
                            href={`/server/${serverId}/channel/${channel.id}/setting`}>
                            <Settings size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

const ChannelCreateDialog = ({ setChannelList }) => {
    const inputRef = useRef(null)

    const serverId = useSelector(state => state.currentWatchServerId.value)

    const handleCreateChannel = async () => {
        try {
            const res = await axios.post('api/channel/create', {
                name: inputRef.current.value,
                server_id: serverId,
            })

            const newChannel = res.data.data

            setChannelList(prev => [...prev, newChannel])
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
