import { useState, useEffect } from 'react'
import axios from '@/lib/axios.js'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

export const useFetchUserId = () => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await axios.get('/api/user')
                setUserId(res.data.id)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserId()
    }, [])

    return userId
}

export const useAutoScroll = messages => {
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return scrollRef
}

export const useSendMessageInDm = dmId => {
    const messageInputRef = useRef(null)

    const sendMessage = async () => {
        try {
            await axios.post('/api/dm/message/send', {
                dm_id: dmId,
                message: messageInputRef.current.value,
            })

            messageInputRef.current.value = ''
        } catch (error) {
            throw error
        }
    }

    const handleEnterKey = event => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    return { messageInputRef, handleEnterKey, sendMessage }
}

export const useSendMessageInChannel = channelId => {
    const messageInputRef = useRef(null)

    const sendMessage = async () => {
        try {
            await axios.post('/api/channel/message/send', {
                channel_id: channelId,
                message: messageInputRef.current.value,
            })

            messageInputRef.current.value = ''
        } catch (error) {
            throw error
        }
    }

    const handleEnterKey = event => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    return { messageInputRef, handleEnterKey, sendMessage }
}

export const useOperationMessageInDm = () => {
    const dmId = useSelector(state => state.currentWatchDmId.value)

    const handleEditMessage = async (newMessage, created_at) => {
        try {
            await axios.put(`api/dm/message/edit`, {
                dm_id: dmId,
                content: newMessage,
                created_at: created_at,
            })
        } catch (error) {
            throw error
        }
    }

    const handleDeleteMessage = async created_at => {
        try {
            await axios.delete(`api/dm/${dmId}/message/delete/${created_at}`)
        } catch (error) {
            throw error
        }
    }

    return { handleEditMessage, handleDeleteMessage }
}

export const useOperationMessageInChannel = () => {
    const channelId = useSelector(state => state.currentWatchChannelId.value)

    const handleEditMessage = async (newMessage, created_at) => {
        try {
            await axios.put(`api/channel/message/edit`, {
                channel_id: channelId,
                message: newMessage,
                created_at: created_at,
            })
        } catch (error) {
            throw error
        }
    }

    const handleDeleteMessage = async created_at => {
        try {
            await axios.delete(
                `api/channel/${channelId}/message/delete/${created_at}`,
            )
        } catch (error) {
            throw error
        }
    }

    return { handleEditMessage, handleDeleteMessage }
}
