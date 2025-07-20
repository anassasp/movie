import { useQuery } from "@tanstack/react-query";
import { fetchCategorizedMovies } from "../../../api/tmdb";
import { CATEGORY_TITLE_MAPPING } from "../../../statics/enum";
import type { CategorizedMovieProps } from "../../../types/Global";
import CategorySlider from "./CategorySlider";
import { Link } from "react-router-dom";

type CategorySectionProps = {
  category: CategorizedMovieProps;
};

export default function CategorySection({ category }: CategorySectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["categoryMovies", category],
    queryFn: () => fetchCategorizedMovies(category),
  });

  return (
    <section className="mb-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-400 sm:mb-4 sm:pl-16">
          {CATEGORY_TITLE_MAPPING[category]}
        </h1>
        <Link
          to={`/movies/category/${category}`}
          className="pr-16 text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
        >
          See More
        </Link>
      </div>

      <CategorySlider moviesCategory={data?.results} isLoading={isLoading} />
    </section>
  );
}
