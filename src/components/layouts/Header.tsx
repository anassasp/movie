import HomeButton from "../button/Home";
import SearchBar from "../global/SearchBar";

export default function Header() {
  return (
    <header className="mb-6 flex flex-col gap-4 px-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-16">
      <div className="mx-auto flex w-max items-center gap-1 rounded bg-yellow-400 py-1 pr-2 pl-1 sm:mx-0">
        <img src="/logo.png" className="size-8" alt="Logo" />
        <h1 className="font-serif font-medium tracking-wider text-black italic">
          Filmty
        </h1>
      </div>
      <div className="flex gap-6">
        <SearchBar />
        <HomeButton />
      </div>
    </header>
  );
}
