'use client'

import { Users, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import LeftNav from '@/components/selfMade/LeftNav'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import Pending from '@/components/selfMade/Home/pending/Pending'
import axios from '@/lib/axios'
import Home from '@/components/selfMade/Home/Home'

export default function Page() {
    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <LeftNav />
            <Home></Home>
        </div>
    )
}
