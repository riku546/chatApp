'use client'

import { addServerToServerList } from '@/app/store/slice/serverList'
import axios from '@/lib/axios'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
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

    const handleCreateServer = async () => {
        const newServerName = inputRef.current.value

        const newServerId = await createServer(newServerName)

        //reduxで管理しているサーバーリストに新しいサーバーを追加
        dispatch(
            addServerToServerList({
                newServerName: newServerName,
                newServerId: newServerId,
            }),
        )

        await joinServer(newServerId)

        await createChannel(newServerId)
    }

    const createServer = async serverName => {
        try {
            const res = await axios.post('/api/server/create', {
                name: serverName,
            })

            //サーバーのidはint型のauto incrementなので、現在のサーバー数がサーバーのidとなる
            const newServerId = res.data.data[0].new_server_id

            return newServerId
        } catch (error) {
            throw error
        }
    }

    const createChannel = async newServerId => {
        try {
            await axios.post('api/channel/create', {
                name: '一般',
                server_id: newServerId,
            })
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

export default ServerCreateDialog
