import { useState, useEffect } from 'react';
import axios from 'axios';
import noPoster from '../assets/no-poster.jpg';

interface MovieDetailsProps {
  imdbID: string;
}

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Director: string;
  Plot: string;
  imdbRating: string;
  Actors: string;
  Runtime: string;
  Rated: string;
}

function MovieDetails({ imdbID }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      if (!apiKey) {
        setError('OMDB API key is missing. Please set VITE_OMDB_API_KEY in your .env file.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        );
        if (response.data.Response === 'True') {
          setMovie(response.data);
          setError(null);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (loading) return <div className="spinner mt-10"></div>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!movie) return null;

  return (
    <div className="card slide-up">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
          alt={`${movie.Title} poster`}
          className="w-full md:w-1/3 rounded-lg shadow-sm"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-glow">
            {movie.Title} ({movie.Year})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Director:</strong> {movie.Director}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Rated:</strong> {movie.Rated}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>IMDb Rating:</strong> {movie.imdbRating}/10
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;