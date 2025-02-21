'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { useRef } from 'react'

const AddFriend = () => {
    const inputRef = useRef(null)

    const sendFriendRequest = async () => {
        try {
            await axios.post('/api/friend-request/send', {
                receiver_id: inputRef.current.value,
            })

            //inputの中身を空にする
            inputRef.current.value = ''
        } catch (error) {
            throw error
        }
    }
    return (
        <div className="text-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-semibold mb-2">フレンドに追加</h1>
                <p className="text-gray-400 text-sm mb-4">
                    DiscordユーザーIDでフレンドを追加できます。
                </p>
                <div className="flex gap-2">
                    <Input
                        ref={inputRef}
                        placeholder="DiscordユーザーIDでフレンドを追加できます。"
                        className="flex-1 bg-[#1E1F22] border-none text-gray-100 placeholder:text-gray-500"
                    />
                    <Button
                        className="bg-[#695df2]  text-white"
                        onClick={sendFriendRequest}>
                        フレンド申請を送信
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddFriend
