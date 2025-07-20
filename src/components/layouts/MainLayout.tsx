import Footer from "./Footer";
import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="min-h-[calc(100dvh-11rem)] px-4 sm:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
