'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import Dm from '@/components/selfMade/Dm/Dm'
import { useParams } from 'next/navigation'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import useInitialProcess from '@/hooks/useInitialProcess'
import useDm from '@/hooks/page/useDm'
import { setIsLoadingMessage } from '@/app/store/slice/isLoadingMessage'

export default function page() {
    useInitialProcess()

    const dmId = useParams().id

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentWatchDmId(dmId))

        dispatch(setIsLoadingMessage(true))
    }, [])

    useDm(dmId)

    return <Dm />
}
