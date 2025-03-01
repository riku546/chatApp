'use client'

import React, { useEffect, useState } from 'react'

import Server from '@/components/selfMade/Server/Server'
import axios from '@/lib/axios'
import { useSelector } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import useChannel from '@/hooks/page/useChannel'

const page = () => {
    useInitialProcess()

    const {
        messages,
        setMessages,
        channelList,
        setChannelList,
        currentWatchChannelId,
    } = useChannel()

    return (
        <Server
            messages={messages}
            setMessages={setMessages}
            channelList={channelList}
            currentWatchChannelId={currentWatchChannelId}
            setChannelList={setChannelList}
        />
    )
}

export default page
