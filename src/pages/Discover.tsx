import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { discoverMovie } from "../api/tmdb";
import MovieSorting from "../components/button/Sorting";
import MovieCard from "../components/global/MovieCard";
import SkeletonLoading from "../components/global/SkeletonLoading";
import type { Movie } from "../types/Global";

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

export default function DiscoverMovies() {
  const [sorting, setSorting] = useState("popularity.desc");
  const {
    data: movies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["discoverMovie", sorting],
    queryFn: (queryParam) => discoverMovie(sorting, queryParam.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.total_pages !== lastPage.total_results) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  if (isError) return <p className="pt-20 text-center">No movie found!</p>;
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
          Discover Movies
        </h2>
        <MovieSorting onChange={setSorting} selected={sorting} />
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
