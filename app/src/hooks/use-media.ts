import {get, writable} from 'svelte/store'
import { browser } from '$app/env'

const MEDIA_PATH_KEY = 'mediaPath'
const mediaPath = browser ? writable(localStorage.getItem(MEDIA_PATH_KEY)) : writable()

const setMediaPath = (path: string) => {
  localStorage.setItem(MEDIA_PATH_KEY, path)
  mediaPath.set(path)
}

const logout = ()=>{
  localStorage.clear()
  mediaPath.set(null)
}

export const useMedia = () => {
  browser && console.log('Path', get(mediaPath))
  return {
    mediaPath,
    logout,
    setMediaPath
  }
}