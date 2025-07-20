import { useParams } from "react-router-dom";
import type { MovieGenre } from "../../../types/Global";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieById } from "../../../api/tmdb";
import TextLoading from "../../global/TextLoading";

export default function BannerDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => fetchMovieById(id!),
    enabled: !!id,
  });

  const genreList =
    data?.genres?.reduce(
      (total: string[], row: MovieGenre) => [...total, row.name],
      [],
    ) || [];

  if (isLoading)
    return (
      <div>
        <div className={"mb-4 h-[80dvh] animate-pulse rounded bg-gray-300"} />
        <TextLoading />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-[80dvh] flex-col items-center justify-center">
        <p className="tracking-wider text-gray-500 italic">
          Failed to load data
        </p>
      </div>
    );

  return (
    <>
      <div
        className={"h-[40dvh] rounded bg-cover bg-center sm:h-[80dvh]"}
        style={{
          backgroundImage: `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${data.backdrop_path})`,
        }}
      >
        <div className="hidden h-full w-1/3 flex-col justify-center rounded-l from-white from-80% to-transparent pr-20 pl-8 sm:flex sm:bg-linear-to-r">
          <h1 className="mt-4 text-3xl font-bold text-black">{data.title}</h1>

          <div className="flex items-end gap-4">
            <p className="mt-2 text-sm font-bold text-yellow-400">
              ⭐ {data.vote_average}
            </p>
            {data?.adult ? (
              <p className="rounded-sm border border-red-800 px-1 py-0.5 text-xs text-red-800">
                18+
              </p>
            ) : (
              <></>
            )}
          </div>
          <p className="mt-4 text-xs text-black">{genreList.join(" / ")}</p>
        </div>
      </div>

      <div className="sm:hidden">
        <h1 className="mt-4 text-2xl font-bold text-yellow-400">
          {data.title}
        </h1>

        <p className="mt-2 text-sm font-bold text-yellow-400">
          ⭐ {data.vote_average}
        </p>
        <div className="flex items-end gap-4">
          {data?.adult ? (
            <p className="rounded-sm border border-red-800 px-1 py-0.5 text-xs text-red-800">
              18+
            </p>
          ) : (
            <></>
          )}
        </div>
        <p className="mt-4 text-xs text-white">{genreList.join(" / ")}</p>
      </div>
      <section>
        <h1 className="mt-10 mb-4 text-2xl font-semibold text-yellow-400">
          Synopsis
        </h1>
        <p>{data?.overview}</p>
      </section>
    </>
  );
}
