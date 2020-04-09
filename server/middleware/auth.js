import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN, (error, user) => {
        if (error) return res.sendStatus(401)
        req.user = user
        next()
    })
}

