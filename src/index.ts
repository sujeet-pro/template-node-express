import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { createHttpTerminator } from 'http-terminator'
import methodOverride from 'method-override'
import { resolve } from 'node:path'
import responseTime from 'response-time'
import swaggerUi from 'swagger-ui-express'
import { apiRouter } from './api'
import { errorMiddleware } from './middleware/error.middleware'
import { logMiddleware } from './middleware/log.middleware'
import { notFound } from './middleware/not-found.middleware'
import { validAcceptHeaders } from './middleware/valid-accept-headers.middleware'
import { validContentTypeHeaders } from './middleware/valid-content-type-header.middleware'
import { probes } from './probes'
import { logger } from './utils/logger.utils'

const PORT = process.env.PORT || 3000
const app = express()
// Configuring middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // querystring or qs?
app.use(cookieParser())
// override with different headers; last one takes precedence
app.use(methodOverride('_method')) //                override with POST having ?_method=DELETE
app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM
app.use(cors())
app.use(helmet())
app.use(responseTime())
app.use(logMiddleware)
app.disable('x-powered-by')

// Configuring view engine
app.set('views', resolve('./views'))
app.set('view engine', 'ejs')

// Configuring routes
app.use('/public', express.static(resolve('./public'), { etag: true }))
// Docs
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/public/api-docs.yml',
    },
  }),
)
app.use('/probes', probes)
app.use(
  '/api',
  validAcceptHeaders('application/json', '*/*'),
  validContentTypeHeaders('application/json'),
  apiRouter,
)

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
