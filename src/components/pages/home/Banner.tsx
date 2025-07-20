import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchTrendingMovie } from "../../../api/tmdb";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string;
  overview: string;
};

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: movies,
    isLoading,
    isError,
    refetch,
  } = useQuery<Movie[]>({
    queryKey: ["trending"],
    queryFn: fetchTrendingMovie,
  });

  useEffect(() => {
    const moviesLength = movies?.length ?? 0;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % moviesLength);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies?.length]);

  if (isLoading)
    return (
      <div className="relative mb-20 flex h-[85dvh] animate-pulse items-center justify-center">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
    );

  if (isError || !movies?.length)
    return (
      <div className="flex h-[85dvh] flex-col items-center justify-center">
        <p className="tracking-wider text-gray-500 italic">
          Failed to load banner
        </p>
        <button
          onClick={() => refetch()}
          type="button"
          className="mt-4 rounded bg-yellow-400 px-2 py-1 text-black"
        >
          Refresh
        </button>
      </div>
    );

  return (
    <section className="relative mb-20 h-[85dvh] overflow-hidden">
      {movies.map((movie, index) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
          style={{
            backgroundImage: `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
          <div className="absolute bottom-10 left-6 max-w-xl text-white md:left-12">
            <h1 className="mb-4 text-xl font-bold md:text-5xl">
              {movie.title || movie.name}
            </h1>
            <p className="mb-6 line-clamp-3 text-xs md:text-base">
              {movie.overview}
            </p>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-2 cursor-pointer rounded-full ${
              currentIndex === index ? "bg-yellow-500" : "bg-yellow-800"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
