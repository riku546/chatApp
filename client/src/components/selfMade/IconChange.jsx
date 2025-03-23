import { User } from 'lucide-react'
import React, { useRef } from 'react'
import Image from 'next/image'

const IconChange = ({ icon, setIcon }) => {
    const fileInputRef = useRef(null)

    const handleIconClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = event => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setIcon(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative flex justify-center items-center w-28 h-28 rounded-full  cursor-pointer"
                onClick={handleIconClick}>
                {icon ? (
                    <Image
                        src={icon}
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
        </div>
    )
}

export default IconChange
