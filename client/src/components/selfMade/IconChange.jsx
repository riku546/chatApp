import { User } from 'lucide-react'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const IconChange = ({ avatar, setAvatar }) => {
    const fileInputRef = useRef(null)

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = event => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative flex justify-center items-center w-28 h-28 rounded-full  cursor-pointer"
                onClick={handleAvatarClick}>
                {avatar ? (
                    <Image
                        src={avatar}
                        alt="Avatar"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                ) : (
                    <User width={48} height={48} />
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <Button
                type="button"
                onClick={handleAvatarClick}
                className="mt-2 bg-[#554cc4]">
                アバターを変更
            </Button>
        </div>
    )
}

export default IconChange
