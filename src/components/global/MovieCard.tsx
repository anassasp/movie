import { Link } from "react-router-dom";
import { getYearFromDateString } from "../../utils/format";
import type { Movie } from "../../types/Global";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block overflow-hidden rounded-xl bg-gray-800 shadow transition hover:shadow-xl"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-72 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <h2 className="text-xs font-medium">
          {getYearFromDateString(movie.release_date)}
        </h2>
        <p className="mt-1 line-clamp-3 text-sm text-gray-300">
          {movie.overview}
        </p>
        <p className="mt-2 text-xs font-bold text-yellow-400">
          ⭐ {movie.vote_average}
        </p>
      </div>
    </Link>
  );
}
