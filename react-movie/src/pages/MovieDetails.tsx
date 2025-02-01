import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, ArrowLeft } from 'lucide-react';
import OMDBApi from '../shared/OMDBApi/OMDBApi';
import { useMovieStore } from '../store/useMovieStore';

const MovieDetails = () => {
  const { id } = useParams();
  const { toggleLike, isLiked } = useMovieStore();
  const liked = id ? isLiked(id) : false;

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => OMDBApi.getMovieDetails(id!),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
        Идентификатор фильма обязателен
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto animate-pulse px-4 py-8">
        <div className="h-[600px] rounded-lg bg-gray-800" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
        Фильм не найден
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2" />
          Вернуться к поиску
        </Link>
        <button
          onClick={() => toggleLike(movie.imdbID)}
          className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
        >
          <Heart className="mr-2" fill={liked ? 'currentColor' : 'none'} />
          {liked ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
            alt={movie.Title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="mb-4 text-4xl font-bold">{movie.Title}</h1>
          <div className="mb-6 space-y-2">
            <p className="text-gray-400">{movie.Year} • {movie.Runtime}</p>
            <p className="text-gray-400">{movie.Genre}</p>
          </div>
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">Сюжет</h2>
            <p className="text-gray-300">{movie.Plot}</p>
          </div>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-semibold text-gray-400">Режиссер:</span> {movie.Director}</p>
            <p><span className="font-semibold text-gray-400">Актеры:</span> {movie.Actors}</p>
            <p><span className="font-semibold text-gray-400">Рейтинг:</span> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;