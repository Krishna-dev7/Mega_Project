const conf = {
    mongodb: process.env.MONGODB_URI,
    resend: process.env.RESEND_API_KEY,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

export default conf;