import { Router } from 'express'

export const probes = Router()

probes.route('/health').get((_req, res) => {
  res.status(204).send()
})

probes.route('/ready').get((_req, res) => {
  res.status(204).send()
})
