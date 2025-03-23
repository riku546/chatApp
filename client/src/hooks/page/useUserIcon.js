import axios from '@/lib/axios'
import { getIconFromR2, putIconToR2 } from '@/lib/r2'

const useUserIcon = () => {
    const handleGetUserIcon = async userId => {
        return await getIconFromR2(`user-${userId}-icon`)
    }

    const handlePutUserIcon = async (iconBase64, userId) => {
        await putIconToR2(iconBase64, `user-${userId}-icon`)

        await enableIcon()
    }

    const enableIcon = async () => {
        try {
            await axios.put('api/user/enable-icon')
        } catch (error) {
            throw error
        }
    }

    return {
        handleGetUserIcon,
        handlePutUserIcon,
    }
}

export default useUserIcon
