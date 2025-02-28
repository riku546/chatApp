import { setCurrentWatchChannelId } from '@/app/store/slice/currentWatchChannelId'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
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
import { useSelector } from 'react-redux'

export default function channelListAndUserFiled({
    channelList,
    currentWatchChannelId,
    setChannelList,
}) {
    return (
        <div className="flex">
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <ChannelList
                    channelList={channelList}
                    currentWatchChannelId={currentWatchChannelId}
                    setChannelList={setChannelList}
                />
                <UserInfoFiled />
            </div>
        </div>
    )
}

const ChannelList = ({
    channelList,
    currentWatchChannelId,
    setChannelList,
}) => {
    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="flex justify-between items-center ">
                    <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                        チャンネル
                    </div>
                    <ChannelCreateDialog
                        setChannelList={setChannelList}></ChannelCreateDialog>
                </div>
                {channelList.map(channel => (
                    <Link
                        href={`/server/channel`}
                        key={channel.id}
                        onClick={() => {
                            setCurrentWatchChannelId(channel.id)
                            fetchChannelMessage(channel.id)
                        }}>
                        <Button
                            variant="ghost"
                            className={'w-full justify-start gap-2 h-11 '}
                            style={{
                                backgroundColor:
                                    currentWatchChannelId === channel.id
                                        ? '#36393f'
                                        : '',
                            }}>
                            <span className="text-sm">{channel.name}</span>
                        </Button>
                    </Link>
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
            await axios.post('api/channel/create', {
                name: inputRef.current.value,
                server_id: serverId,
            })

            setChannelList(prev => [...prev, {}])
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
