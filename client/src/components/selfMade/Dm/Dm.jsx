import React from 'react'
import DmListAndUserFiled from './DmListAndUserFiled/DmListAndUserFiled'
import MessageContent from '../MessageContent'
import ServerList from '../ServerList'
import {
    useOperationMessageInDm,
    useSendMessageInDm,
} from '@/hooks/components/MessageContent'
import { useSelector } from 'react-redux'
import FriendDataSideBar from './FriendDataSideBar/FriendDataSideBar'
import BottomNav from '../Responsive/BottomNav/BottomNav'
import ServerDrawer from '../Responsive/BottomNav/ServerDrawer'
import DmDrawer from '../Responsive/BottomNav/DmDrawer'

const Dm = () => {
    const dmId = useSelector(state => state.currentWatchDmId.value)

    //アイコンの取得には時間がかかる(cloudflare r2のため)
    const friendIcons = useSelector(state => state.friendIcons.value)
    if (!friendIcons)
        return (
            <div className="h-screen flex items-center justify-center bg-[#313338]">
                ローディング...
            </div>
        )

    return (
        <div className="flex  h-screen bg-[#313338] text-gray-100">
            <div className="hidden md:block">
                <ServerList></ServerList>
            </div>
            <div className=" hidden md:flex">
                <DmListAndUserFiled />
            </div>
            <div className="h-full flex-1">
                <div className="h-full flex flex-col ">
                    <div className="flex-1 overflow-y-auto">
                        <MessageContent
                            messageType={'dm'}
                            id={dmId}
                            useMessageCustomHook={useSendMessageInDm}
                            useOperationMessageCustomHook={
                                useOperationMessageInDm
                            }
                            userIconList={friendIcons}
                        />
                    </div>

                    <BottomNav>
                        <ServerDrawer />
                        <DmDrawer />
                    </BottomNav>
                </div>
            </div>
            <div className="hidden xl:flex">
                <FriendDataSideBar />
            </div>
        </div>
    )
}

export default Dm
