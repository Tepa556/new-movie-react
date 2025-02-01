import axios from "axios";
const BASE_URL = "https://www.omdbapi.com/";

const OMDBApiInstance = axios.create({ baseURL: BASE_URL });

const API_KEY = "505480d7";

export interface IMovie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ISearchMovieRDO {
  Response: string;
  totalResults: string;
  Search: IMovie[];
}

export interface MovieDetails extends IMovie {
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Runtime: string;
}

const OMDBApi = {
  searchMovies: async (title: string) => {
    const res = await OMDBApiInstance.get<ISearchMovieRDO>("", {
      params: { apikey: API_KEY, s: title },
    });
    return res.data;
  },
  getMovieDetails: async (imdbID: string) => {
    const res = await OMDBApiInstance.get<MovieDetails>("", {
      params: { apikey: API_KEY, i: imdbID, plot: 'full' },
    });
    return res.data;
  },
};

export default OMDBApi;