import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../../../api/tmdb";
import Slider from "./Slider";

export default function MovieCasts() {
  const { id } = useParams();
  const { data: credits, isLoading } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => fetchMovieCredits(id!),
    enabled: !!id,
  });

  return (
    <section className="mt-16 space-y-9 pb-10">
      <Slider
        title="Main Casts"
        sliderList={credits?.cast}
        render={(name, desc) => (
          <>
            <p className="mt-2 text-center text-sm font-medium">{name}</p>
            <p className="text-center text-xs text-yellow-400 italic">
              as {desc}
            </p>
          </>
        )}
      />
      <Slider
        title="Crews"
        sliderList={credits?.crew}
        render={(name, desc) => (
          <>
            <p className="mt-2 text-center text-sm font-medium">{name}</p>
            <p className="text-center text-xs">{desc}</p>
          </>
        )}
      />
    </section>
  );
}
