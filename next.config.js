module.exports = {
    images: {
        domains: ['sample-api-data.vercel.app', 'images.unsplash.com']
    },
    env: {
        mongodbURI: process.env.MONGODB_URI,
        secret_key: process.env.SECRET_KEY,
        mail_user: process.env.MAIL_USER,
        pass_user: process.env.PASS_USER,
        mail_to: process.env.MAIL_TO,
        NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
    }
}