module.exports = {
    images: {
        domains: ['sample-api-data.vercel.app', 'images.unsplash.com', 'res.cloudinary.com']
    },
    env: {
        mongodbURI: process.env.MONGODB_URI,
        secret_key: process.env.SECRET_KEY,
        mail_user: process.env.MAIL_USER,
        mail_pass: process.env.MAIL_PASS,
        mail_to: process.env.MAIL_TO,
        host: process.env.HOST,
        nextauth_url: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
    }
}
