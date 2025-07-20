import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";
import CategorizedMovie from "./pages/Category";
import DiscoverMovies from "./pages/Discover";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies/discover" element={<DiscoverMovies />} />
        <Route
          path="/movies/category/:category"
          element={<CategorizedMovie />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
