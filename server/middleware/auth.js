import jwt from 'jsonwebtoken'

export const signin = (req, res, next) => {
    const header = req.headers['x-access-token']
    const token = header && header.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN, (error, user) => {
        console.log(error)
        if (error) return res.sendStatus(401)
        req.user = user
        next()
    })
}

