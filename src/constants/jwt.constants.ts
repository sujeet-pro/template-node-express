import type { Algorithm } from 'jsonwebtoken'

export const JWT_CONFIG = {
  audience: 'https://sujeet.pro/protected',
  issuer: 'https://sujeet.pro',
  secret: process.env.JWT_SECRET!,
  algorithm: process.env.JWT_ALGORITHM as Algorithm,
}
