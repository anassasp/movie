import {
  ArrowsUpDownIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { sortOptions } from "../../statics/movie-sorting";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

function getSortIcon(sortBy: string) {
  if (sortBy.endsWith(".desc"))
    return <BarsArrowDownIcon className="h-5 w-5" />;
  if (sortBy.endsWith(".asc")) return <BarsArrowUpIcon className="h-5 w-5" />;
  return <ArrowsUpDownIcon className="h-5 w-5" />;
}

export default function MovieSorting({ selected, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative mb-4 inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 rounded bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        {getSortIcon(selected)}
        {sortOptions.find((o) => o.value === selected)?.label}
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-48 rounded bg-white shadow-lg dark:bg-gray-800">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === option.value ? "font-bold" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
