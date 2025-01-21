import { Router } from 'express'
import type { Request } from 'express-jwt'

export const samplesProtectedRoutes = Router()

samplesProtectedRoutes.get('/hello-world', (req: Request, res) => {
  res.json({
    message: 'Hello, World!',
    auth: req.auth,
  })
})
