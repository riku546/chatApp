import axios from '@/lib/axios'
import { getIconFromR2, putIconToR2 } from '@/lib/r2'

const useServerIcon = () => {
    const handleGetServerIcon = async serverId => {
        return await getIconFromR2(`server-${serverId}-icon`)
    }

    const handlePutServerIcon = async (iconBase64, serverId) => {
        await putIconToR2(iconBase64, `server-${serverId}-icon`)

        await enableIcon(serverId)
    }

    const enableIcon = async serverId => {
        try {
            await axios.put('api/server/enable-icon', {
                server_id: serverId,
            })
        } catch (error) {
            throw error
        }
    }

    return {
        handleGetServerIcon,
        handlePutServerIcon,
    }
}

export default useServerIcon
