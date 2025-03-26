import { HomeIcon, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const BottomNav = ({ children }) => {
    const userInfo = useSelector(state => state.userInfo.value)

    return (
        <div className="flex md:hidden h-14  items-center justify-around bg-[#2b2d31] px-2">
            <Link
                href={'/'}
                className="flex flex-col items-center justify-center space-y-1">
                <HomeIcon size={28}/>
                <p className="text-xs text-gray-400">ホーム</p>
            </Link>

            {children}

            <Link
                href={'/dashboard'}
                className="flex flex-col items-center justify-center space-y-1">
                {userInfo.set_icon ? (
                    <Image
                        width={24}
                        height={24}
                        src={userInfo.icon}
                        alt="Avatar"
                        objectFit="cover"
                        className="rounded-full"
                    />
                ) : (
                    <User />
                )}
                <p className="text-xs text-gray-400 ">あなた</p>
            </Link>
        </div>
    )
}

export default BottomNav
