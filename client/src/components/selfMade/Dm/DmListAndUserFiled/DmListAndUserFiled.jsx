import React from 'react'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWatchDmId } from '@/app/store/slice/currentWatchDmId'
import UserInfoFiled from '../../UserInfoFiled'
import Link from 'next/link'

export default function DmListAndUserFiled() {
    return (
        <div className="flex">
            <div className="w-60 bg-[#2b2d31] flex flex-col">
                <DmList />
                <UserInfoFiled />
            </div>
        </div>
    )
}

const DmList = () => {
    const dispatch = useDispatch()

    const currentWatchDmId = useSelector(state => state.currentWatchDmId.value)

    const dmList = useSelector(state => state.dmList.value)

    return (
        <ScrollArea className="flex-1">
            <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1">
                    ダイレクトメッセージ
                </div>
                {dmList &&
                    dmList.map(dm => (
                        <Link
                            href={`/dm/${dm.dm_id}`}
                            key={dm.dm_id}
                            onClick={() => {
                                dispatch(setCurrentWatchDmId(dm.dm_id))
                            }}>
                            <Button
                                variant="ghost"
                                className={'w-full justify-start gap-2 h-11 '}
                                style={{
                                    backgroundColor:
                                        currentWatchDmId === dm.dm_id
                                            ? '#36393f'
                                            : '',
                                }}>
                                <User />
                                <span className="text-sm">{dm.name}</span>
                            </Button>
                        </Link>
                    ))}
            </div>
        </ScrollArea>
    )
}
