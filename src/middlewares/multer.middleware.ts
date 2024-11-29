import multer from 'multer';
import { bucket } from '../config/multerConfig';
import { fileValidator } from '../schemmas/multer.schema';

export const uploadMiddleware = (maxSize: number) => {
    const storageType = process.env.STORAGE_TYPE || 'disk';
    const bucketName = process.env.BUCKET_NAME || 'uploads';

    const storage = bucket({
        storageType: storageType as 'disk' | 'memory', 
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
