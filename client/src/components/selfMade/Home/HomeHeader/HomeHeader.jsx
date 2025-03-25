import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import React from 'react'

const HomeHeader = ({ changeDisplayType }) => {
    return (
        <div className="min-h-12 border-b border-[#1f2023] flex flex-col md:flex-row items-center px-4 py-2 gap-4">
            <div className="flex items-center space-x-3">
                <Users className="w-6 h-6" />
                <span className="font-medium">フレンド</span>
                <div className="hidden md:block h-6 border-l border-gray-600" />
            </div>
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={() => changeDisplayType('全員')}>
                    全員
                </Button>
                <Button
                    variant="ghost"
                    className="h-6 text-sm bg-[#2b2d31]"
                    onClick={() => changeDisplayType('保留中')}>
                    保留中
                </Button>
                <Button
                    className="bg-green-700"
                    variant="success"
                    size="sm"
                    onClick={() => changeDisplayType('フレンド追加')}>
                    フレンドに追加
                </Button>
            </div>
        </div>
    )
}

export default HomeHeader
