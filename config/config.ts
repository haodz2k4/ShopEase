
export default {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    email: {
        smtp:{
            service: 'gmail',
            auth: {
              user: process.env.SMTP_USERNAME as string,
              pass: process.env.SMTP_PASS as string,
            },
          },
        from: process.env.SMTP_FROM
    }
}