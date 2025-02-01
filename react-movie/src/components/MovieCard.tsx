import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { IMovie } from '../shared/OMDBApi/OMDBApi';
import { useMovieStore } from '../store/useMovieStore';

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { toggleLike, isLiked } = useMovieStore();
  const liked = isLiked(movie.imdbID);

  return (
    <div className="movie-card group">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-[400px] w-full object-cover"
        />
        <div className="movie-card-overlay">
          <div className="absolute bottom-0 p-4">
            <h3 className="text-lg font-bold text-white">{movie.Title}</h3>
            <p className="text-sm text-gray-300">{movie.Year}</p>
          </div>
        </div>
      </Link>
      <button
        className="like-button"
        onClick={() => toggleLike(movie.imdbID)}
      >
        {liked ? <Favorite color="error" /> : <FavoriteBorder />}
      </button>
    </div>
  );
};