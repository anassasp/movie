import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  query: string;
};

export default function SearchBar() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = ({ query }: FormData) => {
    if (query.trim()) {
      navigate(`/search?title=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full sm:w-max">
      <input
        className="flex-1 rounded-l-xl border-1 border-yellow-500 px-4 py-2 text-black text-white focus:outline-none"
        type="text"
        {...register("query")}
        placeholder="Search movies..."
      />
      <button
        type="submit"
        className="cursor-pointer rounded-r-xl bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-400"
      >
        Search
      </button>
    </form>
  );
}
