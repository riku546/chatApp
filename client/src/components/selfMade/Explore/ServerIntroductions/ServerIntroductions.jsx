'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import useServerIcon from '@/hooks/page/useServerIcon'
import axios from '@/lib/axios'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'

export default function ServerIntroductions() {
    const [serverInfoList, setServerInfoList] = useState(null)
    const { handleGetServerIcon } = useServerIcon()

    const initializedRef = useRef(false)

    const fetchServerInfo = async () => {
        try {
            const serverList = await (
                await axios.get('/api/all-servers')
            ).data.data

            for (const server of serverList) {
                if (server.set_icon) {
                    const icon = await handleGetServerIcon(server.id)
                    server.icon = icon
                }
            }

            setServerInfoList(serverList)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true

        fetchServerInfo()
    }, [])

    if (!serverInfoList)
        return (
            <div className="flex flex-col h-screen overflow-y-auto scrollbar">
                <Header />
                <div className="flex flex-1 items-center justify-center text-lg">
                    <ReactLoading
                        type={'spin'}
                        color="#3B82F6"
                        height={50}
                        width={50}
                    />
                </div>
            </div>
        )

    return (
        <div className="h-screen overflow-y-auto scrollbar">
            <Header />

            <div className="flex flex-col items-center justify-center  py-8 px-4">
                <h2 className="text-xl font-semibold mb-6">サーバー</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {serverInfoList.map(serverInfo => (
                        <ServerCard
                            key={serverInfo.id}
                            serverInfo={serverInfo}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Header = () => (
    <div className=" px-4 py-16  bg-gradient-to-b from-indigo-950 via-indigo-900 to-gray-900 text-white">
        <div className="flex flex-col items-center justify-center  ">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Discord cloneで自分のコミュニティを探す
            </h1>
            <p className="text-lg text-gray-300">
                ゲームから音楽、学びまで、あなたにぴったりの場所がここにある。
            </p>
        </div>
    </div>
)

const ServerCard = ({ serverInfo }) => {
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
        <div className="min-w-60 max-w-sm bg-[#1e1f22] rounded-md overflow-hidden">
            <div className="relative h-32">
                <img
                    src="/game.jpg"
                    alt="Marvel Rivals banner"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-3  space-y-4">
                <div className="flex items-center  mb-2 space-x-3">
                    {serverInfo.set_icon ? (
                        <Image
                            width={50}
                            height={50}
                            src={serverInfo.icon}
                            alt="Avatar"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    ) : (
                        <div className="bg-indigo-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            <span className="text-sm font-sm">
                                {serverInfo.name.substring(0, 3)}
                            </span>
                        </div>
                    )}
                    <div>
                        <div className="flex items-center">
                            <span className="font-medium">
                                {serverInfo.name}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center mr-4">
                        <span className="bg-green-500 rounded-full w-1.5 h-1.5 mr-1"></span>
                        <span>{serverInfo.num_of_people}人が所属</span>
                    </div>
                    <Button
                        onClick={() => joinServer(serverInfo.id)}
                        className="bg-green-600 hover:bg-green-700">
                        参加
                    </Button>
                </div>
            </div>
        </div>
    )
}
