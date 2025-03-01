'use client'

import Home from '@/components/selfMade/Home/Home'
import useInitialProcess from '@/hooks/useInitialProcess'

export default function Page() {
    useInitialProcess()

    return <Home />
}
