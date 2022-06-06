import { statSync, createReadStream } from 'fs'

const CHUNK_SIZE = 10 ** 7

export const streamVideo = ({ videoPath, range, res }) => {
  const stats = statSync(videoPath)
  const videoSize = stats.size;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
}