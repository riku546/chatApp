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

const Dm = () => {
    const dmId = useSelector(state => state.currentWatchDmId.value)

    //アイコンの取得には時間がかかる(cloudflare r2のため)
    const friendIcons = useSelector(state => state.friendIcons.value)
    if(!friendIcons) return <p>ロード中...</p>

    return (
        <div className="flex h-screen bg-[#313338] text-gray-100">
            <ServerList></ServerList>
            <DmListAndUserFiled />
            <div className="flex-1 overflow-x-hidden">
                <MessageContent
                    messageType={'dm'}
                    id={dmId}
                    useMessageCustomHook={useSendMessageInDm}
                    useOperationMessageCustomHook={useOperationMessageInDm}
                    userIconList={friendIcons}
                />
            </div>
            <FriendDataSideBar  />
        </div>
    )
}

export default Dm
