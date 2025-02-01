import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from '../components/MovieCard';
import OMDBApi from '../shared/OMDBApi/OMDBApi';

const LikedMovies = () => {
  const { likedMovies } = useMovieStore();
  const likedIds = Object.entries(likedMovies)
    .filter(([_, isLiked]) => isLiked)
    .map(([id]) => id);

  const { data: movies } = useQuery({
    queryKey: ['liked-movies', likedIds],
    queryFn: async () => {
      const movies = await Promise.all(
        likedIds.map((id) => OMDBApi.getMovieDetails(id))
      );
      return movies;
    },
    enabled: likedIds.length > 0,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          to="/" 
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600  hover:bg-red-600 hover:text-white"
        >
          <ArrowBack />
        </Link>
        <h1 className="text-2xl font-bold">Любимые фильмы</h1>
      </div>

      {movies && movies.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          Нет любимых фильмов. Начните с добавления фильмов в избранное!
        </p>
      )}
    </div>
  );
};

export default LikedMovies;