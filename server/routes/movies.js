import { Router } from 'express'
import { readdirSync, writeFileSync, readFileSync } from 'fs'
import config from '../config'
import { resolve } from 'path'
import { generateMetaData } from "../services/omdb";
import { streamVideo } from '../lib/stream-video';

const router = Router()
const MOVIES_PATH = config.media.moviesPath
const INFO_FILE_NAME = 'info.json'

router.get('/', async (req, res) => {
  const list = readdirSync(MOVIES_PATH)
  let canUpdate = false
  let info
  try {
    info = require(resolve(MOVIES_PATH, INFO_FILE_NAME))
  } catch (e) {
    info = {}
  }
  const movies = await Promise.all(list
    .filter(file => file !== INFO_FILE_NAME)
    .map(async file => {
      const metaData = info[file]
      if (metaData) return metaData
      canUpdate = true
      return await generateMetaData(file)
    }))
  res.json(movies)
  if (canUpdate) writeFileSync(resolve(MOVIES_PATH, INFO_FILE_NAME), JSON.stringify(movies.reduce((info, movie) => {
    info[movie.File] = movie
    return info
  }, {})))
})

router.get('/info/:file', (req, res) => {
  const infoString = readFileSync(resolve(MOVIES_PATH, INFO_FILE_NAME), { encoding: 'utf-8' })
  const info = JSON.parse(infoString)
  const { file } = req.params
  res.json(info[file])
})

router.get('/watch/:file', async (req, res) => {
  try {
    const range = req.headers.range;
    if (!range) return res.status(400).send("Requires Range header");
    const { file } = req.params
    const videoPath = resolve(MOVIES_PATH, file)
    streamVideo({ videoPath, range, res })
  } catch (error) {
    console.error(error)
    return res.status(400).send("Invalid movie");
  }
})

export default router