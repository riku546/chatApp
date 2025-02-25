'use client'

import { Nunito } from 'next/font/google'
import '@/app/global.css'
import { useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { Provider } from 'react-redux'
import store from './store/store'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    const router = useRouter()
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const isLogin = await (await axios.get('/api/checkLogin')).data
                if (!isLogin) router.push('/register')
            } catch (error) {
                alert('ページをリロードしてください')
            }
        }

        checkLogin()
    }, [])

    return (
        <html lang="ja" className={nunitoFont.className}>
            <body className="antialiased">
                <Provider store={store}>{children}</Provider>
            </body>
        </html>
    )
}

export default RootLayout
