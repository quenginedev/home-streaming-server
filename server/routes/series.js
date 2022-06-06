import { Router } from 'express'
import { readdirSync, writeFileSync, readFileSync } from 'fs'
import config from '../config'
import { resolve } from 'path'
import { generateMetaData } from "../services/omdb";
import { streamVideo } from '../lib/stream-video';

const router = Router()
const SERIES_PATH = config.media.seriesPath
const INFO_FILE_NAME = 'info.json'

router.get('/', async (__, res) => {
  const list = readdirSync(SERIES_PATH)
  console.log({ SERIES_PATH })
  let canUpdate = false
  let info
  try { info = require(resolve(SERIES_PATH, INFO_FILE_NAME)) }
  catch (e) { info = {} }
  const series = await Promise.all(list
    .filter(file => file !== INFO_FILE_NAME)
    .map(async file => {
      const metaData = info[file]
      if (metaData) return metaData
      canUpdate = true
      return await generateMetaData(file)
    }))
  res.json(series)
  if (canUpdate) writeFileSync(resolve(SERIES_PATH, INFO_FILE_NAME), JSON.stringify(series.reduce((info, series) => {
    info[series.File] = series
    return info
  }, {})))
})

router.get('/info/:file', (req, res) => {
  const infoString = readFileSync(resolve(SERIES_PATH, INFO_FILE_NAME), { encoding: 'utf-8' })
  const seriesMetaInfo = JSON.parse(infoString)
  const { file } = req.params
  const info = seriesMetaInfo[file]
  const seasonsList = readdirSync(resolve(SERIES_PATH, file))
  res.json({
    ...info,
    seasonsList
  })
}),

router.get('/info/:file/episodes/:season', (req, res) => {
  const { file, season } = req.params
  const episodes = readdirSync(resolve(SERIES_PATH, file, season))
  res.json(episodes)
})

router.get('/watch/:file/:season/:episode', async (req, res) => {
  try {
    const range = req.headers.range;
    if (!range) return res.status(400).send("Requires Range header");
    const { file, season, episode } = req.params
    const videoPath = resolve(SERIES_PATH, file, season, episode)
    streamVideo({ videoPath, range, res })
  } catch (error) {
    console.error(error)
    return res.status(400).send("Invalid series");
  }
})

export default router