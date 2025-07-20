import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/global/MovieCard";
import type { Movie } from "../types/Global";
import SkeletonLoading from "../components/global/SkeletonLoading";

function useQueryParam() {
  return new URLSearchParams(useLocation().search).get("title") || "";
}

function Loaders() {
  return (
    <>
      <SkeletonLoading />
      <SkeletonLoading />
      <SkeletonLoading />
      <SkeletonLoading />
    </>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const query = useQueryParam();
  const {
    data: movies,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: (queryParam) => searchMovies(query, queryParam.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.total_pages !== lastPage.total_results) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });

  if (!query) return <p>No search query provided</p>;
  if (isLoading)
    return (
      <div className="grid gap-x-3.5 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Loaders />
      </div>
    );

  const items = movies?.pages.flatMap((page) => page.results) || [];

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between bg-gray-900 pt-2 pb-4">
        <h2 className="text-xl font-semibold text-yellow-400">
          Results for "{query}"
        </h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 font-bold text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          Back
        </button>
      </div>
      <InfiniteScroll
        dataLength={items.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loaders />}
        className="grid gap-x-3.5 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {items?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </InfiniteScroll>
    </>
  );
}
