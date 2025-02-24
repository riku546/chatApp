import React from 'react'
import {
    Users,
    RocketIcon as Nitro,
    ShoppingCart,
    Settings,
    User,
    MessageCircle,
    Compass,
    Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import useLeftNav from '@/hooks/components/useLeftNav'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWatchDmId } from '@/app/store/slice/dmIdSlice'
import UserInfoFiled from '../../UserInfoFiled'

export default function DmListAndUserFiled({ fetchDmMessage }) {
    const { dmList, userInfo } = useLeftNav()

    return (
        <div className="flex">
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <DmList dmList={dmList} fetchDmMessage={fetchDmMessage} />
                <UserInfoFiled userInfo={userInfo} />
            </div>
        </div>
    )
}

const DmList = ({ dmList, fetchDmMessage }) => {
    const dispatch = useDispatch()

    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                    ダイレクトメッセージ
                </div>
                {dmList.map(dm => (
                    <div
                        key={dm.dm_id}
                        onClick={() => {
                            dispatch(setCurrentWatchDmId(dm.dm_id))
                            fetchDmMessage(dm.dm_id)
                        }}>
                        <Button
                            variant="ghost"
                            className={'w-full justify-start gap-2 h-11 '}>
                            <User />
                            <span className="text-sm">{dm.name}</span>
                        </Button>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
