### **Ticket Documentation: "Integrate Multer into the API api-openscience for Reusable File Uploads"**

#### **General Overview**
The goal of this ticket is to integrate **Multer**, a file-handling library for Node.js, into the `api-openscience` API. The implementation is designed to be modular and reusable, enabling file uploads of various types and sizes as specified in the configuration.

In this integration, a system was developed to store images on disk and generate `data:` URLs from uploaded images. This approach ensures flexibility and reusability across different endpoints.

---

### **Implemented Code**

#### 1. **Multer Middleware**
The `uploadMiddleware` middleware is the core of this integration, allowing configurable and reusable file handling. It accepts a maximum file size as input and validates the file type. 

To avoid hardcoding, the `storageType` and `bucketName` are now retrieved from environment variables (`STORAGE_TYPE` and `BUCKET_NAME`), with default values of `'disk'` and `'uploads'` respectively.

```typescript
import multer from 'multer';
import { bucket } from '../config/multerConfig';
import { fileValidator } from '../schemas/multer.schema';

export const uploadMiddleware = (maxSize: number) => {
    const storageType = process.env.STORAGE_TYPE || 'disk'; // Dynamically from env
    const bucketName = process.env.BUCKET_NAME || 'uploads'; // Dynamically from env

    const storage = bucket({
        storageType: storageType as 'disk' | 'memory', // Ensure correct type
        bucketName,
    });

    return multer({
        storage,
        fileFilter: fileValidator,
        limits: { fileSize: maxSize },
    });
};
```

---

#### 2. **Storage Configuration**
Two storage options (disk or memory) were implemented using a `bucket` function. Disk storage was chosen for this API, ensuring the directory is created automatically if it doesn’t exist.

```typescript
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface MulterConfigProps {
    storageType: 'disk' | 'memory';
    bucketName: string;
}

export function bucket({ storageType, bucketName }: MulterConfigProps) {
    switch (storageType) {
        case 'disk':
            return multer.diskStorage({
                destination: (req, file, cb) => {
                    const folderPath = path.join(__dirname, `../../${bucketName}`);
                    ensureFolderExists(folderPath);
                    cb(null, folderPath);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const extension = path.extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
                },
            });
        case 'memory':
            return multer.memoryStorage();
    }
}

const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};
```

---

#### 3. **File Validation**
A `fileValidator` function was added to restrict allowed file types (e.g., images) and reject unwanted files.

```typescript
import { FILE_TYPES } from '../utils/constants';

export const fileValidator = (req, file, cb) => {
    if (FILE_TYPES.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type (only images allowed)'), false);
    }
};
```

---

#### 4. **Base64 URL Creation**
Uploaded files are converted into `data:` URLs for immediate use in various contexts.

```typescript
import fs from 'fs';

export function createDataURL(file: Express.Multer.File) {
    const pathImg = file.path;
    const mimeType = file.mimetype;
    const encodeImg = fs.readFileSync(pathImg, 'base64');
    return `data:${mimeType};base64,${encodeImg}`;
}
```

---

#### 5. **File Handling Routes**
A router was configured, including an endpoint for image uploads using the middleware and utilities described above.

```typescript
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { uploadMiddleware } from '../../middlewares/multer.middleware';
import { createDataURL } from '../../utils/createUrl';
import { MAX_FILE_SIZE } from '../../utils/constants';

const ImageRouter = () => {
    const router = express.Router();
    const uploader = uploadMiddleware(MAX_FILE_SIZE);

    router.get('/upload', (req, res) => {
        res.status(StatusCodes.OK).json({ message: 'GET /bucket' });
    });

    router.post('/upload', uploader.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'No image has been uploaded.',
            });
        }
        const url = createDataURL(req.file);
        res.status(StatusCodes.CREATED).json({
            message: 'Image uploaded successfully.',
            filePath: `/uploads/${req.file.filename}`,
            url,
        });
    });

    return router;
};

export default ImageRouter;
```

---

### **`curl` Usage Examples**

#### **Upload an Image**
```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "image=@path_to_your_image.jpg"
```

#### **Successful Response**
```json
{
    "message": "Image uploaded successfully.",
    "filePath": "/uploads/image-163163163-123.jpg",
    "url": "data:image/jpeg;base64,/9j/4AAQSkZJR..."
}
```

#### **File Type Error**
```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: multipart/form-data" \
  -H "Accept: multipart/form-data" \
  -F "image=@path_to_non_image_file.txt"
```

**Response:**
```json
{
    "error": "Invalid file type (only images allowed)"
}
```

---

### **Reusing for New Endpoints**
The same approach can handle other types of resources (e.g., PDF reports). Simply adjust the validation middleware and Multer configuration.

---

### **Additional Notes**
- **Environment Variables:** The configuration for `storageType` and `bucketName` is now taken from environment variables (`STORAGE_TYPE` and `BUCKET_NAME`), with default values set to `'disk'` and `'uploads'` respectively. This approach eliminates hardcoding and allows for better configuration management.
  
**.env example:**
```plaintext
STORAGE_TYPE=disk
BUCKET_NAME=uploads
```