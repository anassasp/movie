import { useQuery } from "@tanstack/react-query";
import { discoverMovie } from "../../../api/tmdb";
import CategorySlider from "./CategorySlider";
import { Link } from "react-router-dom";

export default function DiscoverSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["discoverMovies"],
    queryFn: () => discoverMovie("popularity.desc"),
  });

  return (
    <section className="mb-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-400 sm:mb-4 sm:pl-16">
          Discover Movies
        </h1>
        <Link
          to="/movies/discover"
          className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 sm:pr-16"
        >
          See More
        </Link>
      </div>

      <CategorySlider moviesCategory={data?.results} isLoading={isLoading} />
    </section>
  );
}
