import express from 'express'
import config from './config'
import cors from 'cors'
import MovieRouter from './routes/movies'
import SeriesRouter from './routes/series'
import { hostname } from 'os'
import { lookup } from 'dns'

(async () => {
  const PORT = config.server.port

  const app = express()
  app.use(cors())

  app.get('/', (req, res) => {
    res.status(200).send()
  })
  app.use('/movies', MovieRouter)
  app.use('/series', SeriesRouter)
  app.listen(PORT, () => {
    lookup(hostname(), (__, address, family) => {
      console.log(`Server started\n`)
      console.log(`network:   ${address}:${PORT}`)
      console.log(`local:     localhost:${PORT}`)
    })
  })
})()