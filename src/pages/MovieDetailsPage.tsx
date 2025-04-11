import { useParams, Link } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p className="text-center text-red-500 text-lg">Invalid movie ID.</p>;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-300"
        aria-label="Back to search"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Search
      </Link>
      <MovieDetails imdbID={id} />
    </div>
  );
}

export default MovieDetailsPage;