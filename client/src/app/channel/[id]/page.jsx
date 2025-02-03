'use client'

import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { pusherApiKey, pusherCluster } from '@/app/secretEnv'
import { useParams } from 'next/navigation'

const Page = () => {
    const [pusherInstance, setPusherInstance] = useState(null)
    const [channelId, setChannelId] = useState(null)
    const id = useParams()
    console.log(id)
    useEffect(() => {
        const pusher = new Pusher(pusherApiKey, {
            cluster: pusherCluster,
        })
        setPusherInstance(pusher)

        return () => {
            pusher.unsubscribe('chat' + id)
        }
    }, [])

    const connectChannel = () => {
        const channel = pusherInstance.subscribe('chat' + channelId)
        console.log('current channel', channelId)
        channel.bind('chat-event', data => {
            console.log(data)
        })
    }

    const disconnectChannel = () => {
        pusherInstance.unsubscribe('chat' + channelId)
        console.log('disconnect channel', channelId)
    }

    const request = async () => {
        const res = await axios.get(`/api/chat/${channelId}`)
    }

    return (
        <div>
            <input
                className="bg-slate-800 text-white"
                type="number"
                value={channelId}
                onChange={e => setChannelId(e.target.value)}
            />
            <div className="flex space-x-5">
                <button
                    className="bg-green-700  px-3 py-1 rounded-xl "
                    onClick={() => connectChannel()}>
                    connect
                </button>
                <button
                    className="bg-green-700  px-3 py-1 rounded-xl "
                    onClick={() => disconnectChannel()}>
                    disconnect
                </button>
                <button
                    className="bg-green-700  px-3 py-1 rounded-xl "
                    onClick={() => request()}>
                    boardCast
                </button>
            </div>
        </div>
    )
}

export default Page
