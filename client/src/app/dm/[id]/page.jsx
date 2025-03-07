'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import Dm from '@/components/selfMade/Dm/Dm'
import { useParams } from 'next/navigation'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import useInitialProcess from '@/hooks/useInitialProcess'
import useDm from '@/hooks/page/useDm'

export default function Page() {
    useInitialProcess()

    const dmId = useParams().id

    useDm(dmId)

    return <Dm />
}
