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

export default function Slider({ title, sliderList, render }: SliderProps) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < sliderList?.length - 1) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

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
