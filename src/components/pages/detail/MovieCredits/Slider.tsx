import { useState } from "react";
import NavigationButton from "../../../global/NavigationButton";

type SliderObject = {
  name: string;
  profile_path: string;
  character?: string;
  job?: string;
};

type SliderProps = {
  title: string;
  sliderList: SliderObject[];
  render: (name: string, desc: string | undefined) => React.ReactNode;
  isLoading: boolean;
};

const ARRAY_LOADING_ITEMS = Array.from({ length: 6 });

export default function Slider({
  title,
  sliderList,
  render,
  isLoading,
}: SliderProps) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < sliderList?.length - 1) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (isLoading)
    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="mb-6 h-8 w-40 animate-pulse rounded bg-yellow-300/40" />
          <div className="flex gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>

        <div className="w-full overflow-hidden px-2">
          <ul
            className="flex gap-4 transition-all duration-300"
            style={{
              marginLeft: 0,
              width: `${176 * ARRAY_LOADING_ITEMS.length}px`,
            }}
          >
            {ARRAY_LOADING_ITEMS.map((_, i) => (
              <li key={i} className="flex-shrink-0">
                <div className="size-44 animate-pulse rounded-full bg-gray-300" />
                <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-300" />
                <div className="mt-1 h-3 w-24 animate-pulse rounded bg-gray-200" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-semibold text-yellow-400">{title}</h1>
        <div className="flex gap-4">
          <NavigationButton onClick={prevSlide} direction="left" />
          <NavigationButton onClick={nextSlide} />
        </div>
      </div>
      <div className="w-full overflow-hidden px-2">
        <ul
          className="flex gap-4 transition-all duration-300"
          style={{
            marginLeft: `-${index * 176}px`,
            width: `${176 * sliderList?.length}px`,
          }}
        >
          {sliderList?.map((row: SliderObject, i) => (
            <li key={i} className="flex-shrink-0">
              <img
                src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${row.profile_path}`}
                alt={row.name}
                className="size-44 rounded-full object-cover text-center text-xs"
              />
              {render(row.name, row.character || row.job)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
