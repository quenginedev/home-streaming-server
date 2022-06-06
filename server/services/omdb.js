import axios from 'axios'
import config from '../config'

const http = axios.create({
  baseURL: 'https://www.omdbapi.com'
})

export const generateMetaData = async (File) => {
  const [FileName] = File.split('.')
  const {data} = await http.request({
    url: '/',
    method: 'get',
    params: {
      apiKey: config.omdb.apiKey,
      t: FileName
    }
  })
  return {...data, File}
}