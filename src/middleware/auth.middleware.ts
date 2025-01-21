import { JWT_CONFIG } from '@/constants/jwt.constants'
import { expressjwt } from 'express-jwt'

export const auth = () =>
  expressjwt({
    secret: JWT_CONFIG.secret,
    algorithms: [JWT_CONFIG.algorithm],
    audience: JWT_CONFIG.audience,
    issuer: JWT_CONFIG.issuer,
  })
