
export default {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    email: {
        smtp:{
            host: process.env.SMTP_HOST as string,
            port: parseInt(process.env.SMTP_PORT as string),
            secure: false,
            auth: {
              user: process.env.SMTP_USERNAME as string,
              pass: process.env.SMTP_PASS as string,
            },
          },
        from: process.env.SMTP_FROM
    }
}