

export const appConfig = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/discord-backend',
    jwtExpiresIn: 1000 * 60 * 60 * 24 * 30 // 30 days
}


export const emailConfig = {
    creds: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME as string,
            pass: process.env.EMAIL_PASSWORD as string
        }
    },
    from: {
        support: process.env.SUPPORT_EMAIL as string
    }
}