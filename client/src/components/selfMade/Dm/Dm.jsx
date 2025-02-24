import React from 'react'
import DmListAndUserFiled from './DmListAndUserFiled/DmListAndUserFiled'
import MessageContent from '../MessageContent'

const Dm = ({ fetchDmMessage, messages, setMessages, dmId }) => {
    return (
        <>
            <DmListAndUserFiled fetchDmMessage={fetchDmMessage} />
            <div className="flex-1">
                <MessageContent
                    messages={messages}
                    setMessages={setMessages}
                    messageType={'dm'}
                    id={dmId}
                />
            </div>
        </>
    )
}

export default Dm
