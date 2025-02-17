import { useEffect } from 'react'
import Pusher from 'pusher-js'
import { pusherApiKey, pusherCluster } from '../../pusher-env.js'

export const usePusher = (messageType, id, setMessages) => {
    useEffect(() => {
        const pusher = new Pusher(pusherApiKey, {
            cluster: pusherCluster,
        })

        //websocket通信を確立して、サーバからのメッセージを受け取る
        pusher.subscribe(messageType + id).bind('chat-event', data => {
            console.log(data)
            setMessages(prev => [...prev, data])
        })

        //ユーザーがページを離れたら、websocket通信を切断する
        return () => {
            pusher.unsubscribe(messageType + id)
        }
    }, [messageType, id, setMessages])
}
