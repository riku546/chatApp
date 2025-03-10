'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

export default function ServerIntroductions() {
    const [serverInfoList, setServerInfoList] = useState([])

    const fetchServerInfo = async () => {
        try {
            const res = await axios.get('/api/all-servers')

            setServerInfoList(res.data.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchServerInfo()
    }, [])

    return (
        <div className="h-screen overflow-y-auto">
            {/* Hero Section */}
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

            <div className="flex items-center justify-center  py-8">
                <div className="px-4">
                    <h2 className="text-xl font-semibold mb-6">サーバー</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serverInfoList.map(serverInfo => (
                            <ServerCard
                                key={serverInfo.id}
                                serverInfo={serverInfo}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

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
                <div className="flex items-center  mb-2">
                    <div className="bg-indigo-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <span className="text-sm font-sm">
                            {serverInfo.name.substring(0, 3)}
                        </span>
                    </div>
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
