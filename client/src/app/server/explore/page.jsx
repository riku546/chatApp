'use client'

import Explore from '@/components/selfMade/Explore/Explore'
import useInitialProcess from '@/hooks/useInitialProcess'
import React from 'react'

const page = () => {
    useInitialProcess()

    return <Explore />
}

export default page
