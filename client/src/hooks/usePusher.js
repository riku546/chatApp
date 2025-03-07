import { useEffect } from 'react'
import Pusher from 'pusher-js'
import { pusherApiKey, pusherCluster } from '../../pusher-env.js'
import { useDispatch } from 'react-redux'
import { addMessageToMessageState } from '@/app/store/slice/message.js'

export const usePusher = (messageType, id) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const pusher = new Pusher(pusherApiKey, {
            cluster: pusherCluster,
        })

        //websocket通信を確立して、サーバからのメッセージを受け取る
        pusher.subscribe(messageType + id).bind('chat-event', data => {
            dispatch(addMessageToMessageState(data))
        })

        //ユーザーがページを離れたら、websocket通信を切断する
        return () => {
            pusher.unsubscribe(messageType + id)
        }
    }, [messageType, id])
}
