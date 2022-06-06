import {useMedia} from "./use-media";
import axios from "axios";
import {get} from "svelte/store";

const {mediaPath} = useMedia()


export const useMovie = () => {
  const getMovieList = async () => {
    try {
      const {data} = await axios.request({
        baseURL: get(mediaPath) as string,
        method: 'get',
        url: '/movies',
      })
      return {data}
    } catch (e) {
      console.error(e)
      return {
        error: {message: 'Error fetching movies'}
      }
    }
  }
  const getMovieInfo = async (file: string)=>{
    try {
      const {data} = await axios.request({
        baseURL: get(mediaPath) as string,
        method: 'get',
        url: `/movies/info/${file}`,
      })
      return {data}
    } catch (e) {
      return {
        error: {message: 'Error fetching movies'}
      }
    }
  }
  const generateWatchLink = (file: string) => `${get(mediaPath)}/movies/watch/${file}`
  return {
    getMovieList,
    generateWatchLink,
    getMovieInfo
  }
}