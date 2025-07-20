type PropsType = {
  direction?: "left" | "right";
  className?: string;
  isLoading?: boolean;
};

export default function SwiperNavigationButton({
  direction,
  className,
  isLoading = false,
}: PropsType) {
  if (isLoading)
    return (
      <div className="size-8 animate-pulse rounded rounded-full bg-gray-300 p-2" />
    );

  return (
    <button
      type="button"
      className={`absolute top-1/2 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-black/80 p-2 text-yellow-400 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-50 sm:static ${direction === "left" ? "btn-swiper-left left-0" : "btn-swiper-right right-0"} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="size-8"
        style={{ rotate: direction === "left" ? "180deg" : "0deg" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
}
