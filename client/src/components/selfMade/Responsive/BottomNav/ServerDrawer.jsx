import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import ServerList from '../../ServerList'
import { Server } from 'lucide-react'

const ServerDrawer = () => {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <Server size={28} />
                    <p className="text-xs text-gray-400">サーバー</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="h-screen w-[72px] border-none">
                <ServerList></ServerList>
            </DrawerContent>
        </Drawer>
    )
}

export default ServerDrawer
