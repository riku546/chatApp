import { Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const UserInfoFiled = () => {
    const userInfo = useSelector(state => state.userInfo.value)

    return (
        <div className="p-2 bg-[#232428] flex items-center gap-2">
            <User></User>
            <div className="flex-1 text-sm">
                <div className="font-medium">{userInfo.name}</div>
            </div>
            <Link
                href={'/dashboard'}
                variant="ghost"
                size="icon"
                className="w-8 h-8 flex items-center justify-center">
                <Settings size={18} />
            </Link>
        </div>
    )
}

export default UserInfoFiled
