'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import useInitialProcess from '@/hooks/useInitialProcess'
import { setUserInfo } from '@/app/store/slice/userInfo'
import axios from '@/lib/axios'

export default function Page() {
    useInitialProcess()

    const { logout } = useAuth()

    const userInfo = useSelector(state => state.userInfo.value)
    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState(null)
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

    const handleSubmit = async event => {
        event.preventDefault()

        await updateUserInfo()
    }

    const updateUserInfo = async () => {
        try {
            const res = await axios.put('api/user/update', {
                name: userInfo.name,
                description: userInfo.description,
            })
        } catch (error) {
            throw error
        }
    }

    if (userInfo === null) return <></>

    return (
        <div className="min-w-[500px]">
            <nav className="absolute top-3 left-4 flex flex-col space-y-4">
                <Link href={'/'}>
                    <Button type="button" className="bg-[#554cc4] w-full">
                        ホーム
                    </Button>
                </Link>
                <Button
                    type="button"
                    className="bg-red-800"
                    onClick={() => logout()}>
                    ログアウト
                </Button>
            </nav>
            <div
                className="w-full p-8 space-y-8 rounded-lg shadow-xl"
                style={{ backgroundColor: '#3f4147' }}>
                <h1 className="text-2xl font-bold text-center text-gray-100">
                    プロフィール
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div
                            className="relative flex justify-center items-center w-32 h-32 rounded-full  cursor-pointer"
                            onClick={handleAvatarClick}>
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    layout="fill"
                                    objectFit="cover"
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
                            className="mt-2"
                            style={{ backgroundColor: '#554cc4' }}>
                            アバターを変更
                        </Button>
                    </div>

                    <div>
                        <Label htmlFor="username" className="text-gray-100">
                            ユーザー名
                        </Label>
                        <Input
                            id="username"
                            value={userInfo.name}
                            onChange={e =>
                                dispatch(
                                    setUserInfo({
                                        ...userInfo,
                                        name: e.target.value,
                                    }),
                                )
                            }
                            className="mt-1 bg-gray-700 text-gray-100"
                        />
                    </div>

                    <div>
                        <Label htmlFor="bio" className="text-gray-100">
                            自己紹介
                        </Label>
                        <Textarea
                            id="bio"
                            value={userInfo.description}
                            onChange={e =>
                                dispatch(
                                    setUserInfo({
                                        ...userInfo,
                                        description: e.target.value,
                                    }),
                                )
                            }
                            className="mt-1 bg-gray-700 text-gray-100"
                            rows={4}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full"
                        style={{ backgroundColor: '#554cc4' }}>
                        プロフィールを更新
                    </Button>
                </form>
            </div>
        </div>
    )
}

const UserInfoForm = ({ userInfo, setUserInfo }) => <></>
