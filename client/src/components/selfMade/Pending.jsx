import { Input } from '@/components/ui/input'
import { User, CircleCheck, CircleX } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'

export default function Pending({ sendFriendRequest, receiveFriendRequest }) {
    return (
        <div>
            <div className="text-sm font-semibold text-gray-400 mb-2 pb-1 border-b  border-zinc-600">
                receive ー <span>{receiveFriendRequest.length}</span>
            </div>
            <div className="space-y-2">
                {receiveFriendRequest.map((user, i) => (
                    <div
                        key={`${user}-${i}`}
                        className="flex items-center gap-3 p-2 hover:bg-[#2b2d31] rounded">
                        <Avatar className="w-8 h-8">
                            <User />
                        </Avatar>
                        <div className="flex flex-1 h-8 space-x-10">
                            <div className="font-medium">{user}</div>
                        </div>
                        <div className="flex space-x-4">
                            <CircleX className="hover:cursor-pointer " />
                            <CircleCheck
                                color="#46b937"
                                className="hover:cursor-pointer "
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-sm font-semibold text-gray-400 mb-2 pb-1 border-b border-zinc-600">
                send ー <span>{sendFriendRequest.length}</span>
            </div>
            <div className="space-y-2">
                {sendFriendRequest.map((user, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-2 hover:bg-[#2b2d31] rounded">
                        <Avatar className="w-8 h-8">
                            <User />
                        </Avatar>
                        <div className="flex flex-1 h-8 space-x-10">
                            <div className="font-medium">{user}</div>
                        </div>
                        <div className="flex space-x-4">
                            <CircleX className="hover:cursor-pointer " />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
