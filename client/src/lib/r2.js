import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
    ACCESS_KEY_ID,
    ACCOUNT_ID,
    BUCKET_NAME,
    SECRET_ACCESS_KEY,
} from '../../r2-env'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET_NAME}`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
})

export const putIconToR2 = async (iconBase64, key) => {
    const url = await getSignedUrl(
        S3,
        new PutObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
        { expiresIn: 120 },
    )

    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: iconBase64,
        })
    } catch (error) {
        throw error
    }
}

export const getIconFromR2 = async key => {
    const url = await getSignedUrl(
        S3,
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
        { expiresIn: 120 },
    )

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/octet-stream' },
        })

        const icon = await res.text()

        return icon
    } catch (error) {
        throw error
    }
}
