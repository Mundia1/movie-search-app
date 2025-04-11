import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import noPoster from '../assets/no-poster.jpg';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(movie.imdbID);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFavorite(movie.imdbID);
      showToast('Removed from favorites', 'error');
    } else {
      addFavorite(movie);
      showToast('Added to favorites', 'success');
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="card card-hover fade-in">
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
          alt={`${movie.Title} poster`}
          className="w-full h-72 object-cover"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 btn-icon"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-6 h-6 ${favorited ? 'text-kenya-red' : 'text-gray-400'}`}
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate text-kenya-black dark:text-kenya-white">
          {movie.Title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;