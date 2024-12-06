import multer from 'multer';
import { bucket } from '../config/multerConfig';
import { fileValidator } from '../schemmas/multer.schema';

export const uploadMiddleware = (maxSize: number): multer.Multer => {
    const storageType = (process.env.STORAGE_TYPE || 'disk') as 'disk' | 'memory';
    const bucketName = process.env.BUCKET_NAME || 'uploads';

    const storage = bucket({
        storageType, 
        bucketName,
    });

    return multer({
        storage,
        fileFilter: fileValidator,
        limits: {
            fileSize: maxSize,
        },
    });
};
