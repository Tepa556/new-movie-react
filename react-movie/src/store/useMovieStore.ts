import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MovieStore {
  likedMovies: { [key: string]: boolean };
  toggleLike: (movieId: string) => void;
  isLiked: (movieId: string) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      likedMovies: {},
      toggleLike: (movieId) =>
        set((state) => ({
          likedMovies: {
            ...state.likedMovies,
            [movieId]: !state.likedMovies[movieId],
          },
        })),
      isLiked: (movieId) => get().likedMovies[movieId] || false,
    }),
    {
      name: 'movie-storage',
    }
  )
);