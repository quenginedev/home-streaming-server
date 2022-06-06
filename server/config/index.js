import {config} from 'dotenv'

config()
export default {
  server: {port: process.env.SERVER_PORT} || 5000,
  media: {
    moviesPath: process.env.MEDIA_PATH_MOVIE,
    seriesPath: process.env.MEDIA_PATH_SERIES
  },
  omdb: {apiKey: process.env.OMDB_API_KEY}
}