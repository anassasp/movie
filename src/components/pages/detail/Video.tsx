import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieVideos } from "../../../api/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function VideoList() {
  const { id } = useParams();
  const { data: videos, isLoading } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => fetchMovieVideos(id!),
    enabled: !!id,
  });

  console.log(videos);
  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={5}>
        {videos?.map((video: { key: string; name: string }) => (
          <SwiperSlide key={video.key}>
            <div className="aspect-video">
              <iframe
                scrolling="no"
                src={`https://www.youtube.com/embed/${video.key}?mute=1`}
                title={video.name}
                allow="encrypted-media"
                allowFullScreen
                className="border-non h-full w-full overflow-hidden"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="h-full w-full"
      />
    </div> */}
    </>
  );
}
