import HomeBanner from "../components/pages/home/Banner";
import CategorySection from "../components/pages/home/CategorySection";
import DiscoverSection from "../components/pages/home/DiscoverSection";

export default function Home() {
  return (
    <section>
      <HomeBanner />
      <DiscoverSection />
      <CategorySection category="now_playing" />
      <CategorySection category="popular" />
      <CategorySection category="top_rated" />
      <CategorySection category="upcoming" />
    </section>
  );
}
