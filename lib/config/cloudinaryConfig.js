import { config } from 'cloudinary';
import { v2 } from 'cloudinary'
const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next()
}
const uploader = v2.uploader;
export { cloudinaryConfig, uploader };