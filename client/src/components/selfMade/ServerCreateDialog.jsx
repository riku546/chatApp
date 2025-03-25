'use client'

import { addServerToServerList } from '@/app/store/slice/serverList'
import axios from '@/lib/axios'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { Plus } from 'lucide-react'

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
        <Dialog >
            <DialogTrigger  className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full hover:cursor-pointer ">
                <Plus />
            </DialogTrigger>
            <DialogContent >
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

export default ServerCreateDialog
