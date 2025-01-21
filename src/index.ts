import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { createHttpTerminator } from 'http-terminator'
import methodOverride from 'method-override'
import { resolve } from 'node:path'
import responseTime from 'response-time'
import { apiRouter } from './api'
import { errorMiddleware } from './middleware/error.middleware'
import { logMiddleware } from './middleware/log.middleware'
import { notFound } from './middleware/not-found.middleware'
import { probes } from './probes'
import { logger } from './utils/logger.utils'

const PORT = process.env.PORT || 3000
const app = express()
// Configuring middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // querystring or qs?
app.use(cookieParser())
app.use(methodOverride())
app.use(cors())
app.use(responseTime())
app.use(logMiddleware)

// Configuring view engine
app.set('views', resolve('./views'))
app.set('view engine', 'ejs')

// Configuring routes
app.use('/public', express.static(resolve('./public'), { etag: true }))
app.use('/api', apiRouter)
app.use('/probe', probes)

// Catch 404 and forward to error handler
app.use(notFound)
app.use(errorMiddleware)
// Starting server
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`)
})

// Stoping Server
const httpTerminator = createHttpTerminator({ server })
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')
  httpTerminator
    .terminate()
    .then(() => {
      logger.info('Successfully Terminated all the http connection')
    })
    .catch(() => {
      logger.error('Failed to terminate all the http connection')
    })
})
