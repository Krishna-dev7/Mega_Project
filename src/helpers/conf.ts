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
    appPass: process.env.APP_PASS!
}

export default conf;