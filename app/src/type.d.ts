interface Movie {
  File: string
  Poster: string
  Title: string
  imdbRating: string
  Year: string
  Plot: string
  Actors: string
  Error?: string
  Rated: string
}

interface Series {
  File: string
  Poster: string
  Title: string
  imdbRating: string
  Year: string
  Plot: string
  Actors: string
  Error?: string
  Rated: string
  totalSeasons: string
  seasonsList: Array<string>
}