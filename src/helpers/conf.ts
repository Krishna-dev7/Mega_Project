const conf = {
    mongodb: process.env.MONGODB_URI,
    resend: process.env.RESEND_API_KEY,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    url: process.env.NEXT_PUBLIC_APP_URL,
    secret: process.env.NEXTAUTH_SECRET,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY!,
    stripe_publishable_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    senderEmail: process.env.SENDER_EMAIL!,
    appPass: process.env.APP_PASS!,
    appwrite_avatar_bucketId: process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKETID,
    appwrite_projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTID,
    appwrite_apiKey: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    appwrite_images_bucketId: process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKETID,

    
}

export default conf;