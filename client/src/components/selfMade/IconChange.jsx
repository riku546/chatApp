import { User } from 'lucide-react'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@mui/material'
import { Button } from '@/components/ui/button'
import Cropper from 'react-cropper'
import 'react-cropper/node_modules/cropperjs/dist/cropper.css'

export default function IconChange({ icon, setIcon }) {
    const fileInputRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

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

            //画像を選択したら、クロップ画面を開く
            setIsOpen(true)
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

            {isOpen && (
                <IconCropDialog
                    isOpen={isOpen}
                    handleClose={() => setIsOpen(false)}
                    icon={icon}
                    setIcon={setIcon}
                />
            )}
        </div>
    )
}

const IconCropDialog = ({ handleClose, isOpen, icon, setIcon }) => {
    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <CropFiled
                handleClose={handleClose}
                icon={icon}
                setIcon={setIcon}
            />
        </Dialog>
    )
}

const CropFiled = ({ handleClose, icon, setIcon }) => {
    const cropperRef = useRef(null)

    const croppedImageStyle = {
        width: 150,
        height: 150,
        imageSmoothingQuality: 'high',
    }

    const handleCrop = () => {
        const croppedImage = crop()

        setIcon(croppedImage)

        handleClose()
    }

    const crop = () => {
        const cropper = cropperRef.current?.cropper

        const croppedBase64Image = cropper
            .getCroppedCanvas(croppedImageStyle)
            .toDataURL()

        return croppedBase64Image
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <Cropper
                src={icon}
                background={false}
                className="w-[400px] h-[400px]"
                //1 : 1のアスペクト比
                aspectRatio={1}
                cropBoxResizable={false}
                cropBoxMovable={false}
                dragMode="move"
                guides={false}
                ref={cropperRef}
            />

            <Button onClick={handleCrop}>切り抜く</Button>
        </div>
    )
}
