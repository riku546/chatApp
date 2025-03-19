import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios from 'axios'
import {
    ACCESS_KEY_ID,
    ACCOUNT_ID,
    BUCKET_NAME,
    SECRET_ACCESS_KEY,
} from '../../r2-env'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com/chat-app`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
})

export const putIcon = async (iconBase64, key) => {
    const url = await getSignedUrl(
        S3,
        new PutObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
        { expiresIn: 120 },
    )

    try {
        const res = await axios.put(url, iconBase64, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        })
    } catch (error) {
        throw error
    }
}

export const getIcon = async key => {
    const url = await getSignedUrl(
        S3,
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
        { expiresIn: 120 },
    )

    try {
        const res = await axios.get(url)

        return res.data
    } catch (error) {
        throw error
    }
}
