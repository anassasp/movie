import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Movie } from "../../../types/Global";
import MovieCard from "../../global/MovieCard";
import SkeletonLoading from "../../global/SkeletonLoading";
import SwiperNavigationButton from "../../global/SwiperNavigationButton";

import "swiper/css";
import "swiper/css/navigation";

const LOADING_ARRAY = new Array(5).fill(null);

export default function CategorySlider({
  moviesCategory,
  isLoading,
}: {
  moviesCategory: Movie[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="relative flex items-center gap-4">
        <SwiperNavigationButton direction="left" isLoading={isLoading} />
        <Swiper
          className="relative"
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          navigation={{
            prevEl: ".btn-swiper-left",
            nextEl: ".btn-swiper-right",
          }}
        >
          {isLoading ? (
            LOADING_ARRAY.map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonLoading />
              </SwiperSlide>
            ))
          ) : (
            <>
              {moviesCategory?.map((movie: Movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              ))}

              <SwiperSlide>
                <button></button>
              </SwiperSlide>
            </>
          )}
        </Swiper>
        <SwiperNavigationButton direction="right" isLoading={isLoading} />
      </div>
    </>
  );
}
