import { JWT_CONFIG } from '@/constants/jwt.constants'
import { Router } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
export const samplesAuthRoutes = Router()

function getToken(payload: object, jwtid: string) {
  return (
    'Bearer ' +
    jwt.sign(payload, JWT_CONFIG.secret, {
      algorithm: JWT_CONFIG.algorithm,
      audience: JWT_CONFIG.audience,
      issuer: JWT_CONFIG.issuer,
      expiresIn: '1h',
      jwtid,
      notBefore: '1s',
    })
  )
}

samplesAuthRoutes.get('/', (_req, res) => {
  const id = uuid()
  const payload = {
    sub: '1234567890',
    name: 'John Doe',
    admin: false,
  }
  res.json({
    id,
    name: 'Sample Auth Details For protected API routes',
    token: getToken(payload, id),
    payload,
  })
})

samplesAuthRoutes.post('/', (req, res, next) => {
  if (req.body.sub === undefined) {
    next(createHttpError.BadRequest('sub is required'))
  }
  const id = uuid()
  res.json({
    id,
    name: 'Sample Auth Details For protected API routes',
    token: getToken(req.body, id),
    payload: req.body,
  })
})
