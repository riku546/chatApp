'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [channelName, setChannelName] = useState('')

    const serverId = useParams().serverId
    const channelId = useParams().channelId

    return (
        <div className="h-screen  flex justify-center items-center bg-[#313338]">
            <div className="w-3/4 flex space-x-10">
                <div className="flex  flex-col space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                        <Input
                            value={channelName}
                            onChange={e => setChannelName(e.target.value)}
                            className="flex-1 bg-[#1E1F22] border-none text-gray-100 placeholder:text-gray-500"
                        />
                        <Button>変更</Button>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <p>チャンネルを削除</p>
                        <Button>削除</Button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default page
