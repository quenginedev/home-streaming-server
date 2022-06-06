import { useMedia } from "./use-media";
import axios from "axios";
import { get } from "svelte/store";

const { mediaPath } = useMedia();

export const useSeries = () => {
  const getSeriesList = async () => {
    try {
      const { data } = await axios.request({
        baseURL: get(mediaPath) as string,
        method: "get",
        url: "/series",
      });
      return { data };
    } catch (e) {
      console.error(e);
      return {
        error: { message: "Error fetching movies" },
      };
    }
  };
  const getSeriesInfo = async (file: string) => {
    try {
      const { data } = await axios.request({
        baseURL: get(mediaPath) as string,
        method: "get",
        url: `/series/info/${file}`,
      });
      return { data };
    } catch (e) {
      return {
        error: { message: "Error fetching movies" },
      };
    }
  };
  const generateWatchLink = ({file, episode, season}: {file: string, season: string, episode: string}) =>
    `${get(mediaPath)}/series/watch/${file}/${season}/${episode}`;

  const getSeriesSeasonEpisodes = async (
    { selectedSeason, seriesName }: {
      selectedSeason: string;
      seriesName: string;
    },
  ) => {
    const { data } = await axios.request({
      baseURL: get(mediaPath) as string,
      method: "get",
      url: `/series/info/${seriesName}/episodes/${selectedSeason}`,
    });
    return data
  };
  
  return {
    getSeriesList,
    generateWatchLink,
    getSeriesInfo,
    getSeriesSeasonEpisodes,
  };
};
