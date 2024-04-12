import {v2 as cloudinary} from 'cloudinary';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig({ path: '.development.env'});

export const cloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config ({
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_KEY, 
            api_secret: process.env.CLOUD_KEY_SECRET,
        })
    }
}