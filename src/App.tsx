import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
const CategorizedMovie = lazy(() => import("./pages/Category"));
const DiscoverMovies = lazy(() => import("./pages/Discover"));
const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));

export default function App() {
  return (
    <MainLayout>
      <Suspense fallback={<span className="loader" />}>
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
      </Suspense>
    </MainLayout>
  );
}
