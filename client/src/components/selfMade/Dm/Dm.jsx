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
                />
            </div>
            <FriendDataSideBar  />
        </div>
    )
}

export default Dm
