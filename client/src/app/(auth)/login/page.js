'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-md p-6 space-y-8">
                <AuthSessionStatus className="mb-4" status={status} />
                <form onSubmit={submitForm} className="space-y-6">
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email" className="text-gray-300">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full "
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" className="text-gray-300">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full "
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-600 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <label
                            htmlFor="remember_me"
                            className="ml-2 text-sm text-gray-300">
                            Remember me
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className='flex flex-col space-y-3'>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-indigo-400 hover:text-indigo-300">
                                Forgot your password?
                            </Link>
                            <Link href={'/register'} className="text-sm hover:text-indigo-300">
                                Not registered yet?
                            </Link>
                        </div>

                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
