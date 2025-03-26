import React from 'react'

const BottomNav = ({ children }) => {
    return (
        <div className="flex md:hidden min-h-11  items-center justify-around bg-[#2b2d31] px-2">
            {children}
        </div>
    )
}

export default BottomNav
