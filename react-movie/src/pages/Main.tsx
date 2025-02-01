import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import { MovieCard } from '../components/MovieCard';
import { SearchInput } from '../components/SearchInput';
import OMDBApi from '../shared/OMDBApi/OMDBApi';

const Main = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', search],
    queryFn: () => OMDBApi.searchMovies(search),
    enabled: search.length > 2,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Поиск фильмов</h1>
        <Link 
          to="/liked" 
          className="flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-800"
        >
          <Favorite />
          <span>Любимые фильмы</span>
        </Link>
      </div>

      <div className="mb-8">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {error && (
        <div className="mb-8 rounded-lg bg-red-500/10 p-4 text-red-500">
          Не удалось загрузить фильмы. Пожалуйста, попробуйте снова.
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[400px] animate-pulse rounded-lg bg-gray-800" />
          ))}
        </div>
      )}

      {data?.Search && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.Search.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {search.length > 2 && !isLoading && !data?.Search && (
        <p className="text-center text-gray-400">Фильмы не найдены</p>
      )}
    </div>
  );
};

export default Main;