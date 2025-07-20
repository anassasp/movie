type PropsType = {
  onClick: () => void;
  direction?: "left" | "right";
};

export default function NavigationButton({ onClick, direction }: PropsType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-full border border-white p-1 hover:border-yellow-400 hover:text-yellow-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
        style={{ rotate: direction === "left" ? "180deg" : "0deg" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </button>
  );
}
