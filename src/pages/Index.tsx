import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import ResultsPage from "@/components/ResultsPage";
import { SearchFilters } from "@/types/travel";

const Index = () => {
  const [currentView, setCurrentView] = useState<"search" | "results">("search");
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setCurrentView("results");
  };

  const handleBack = () => {
    setCurrentView("search");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        showBackButton={currentView === "results"}
        onBack={handleBack}
      />

      {currentView === "search" ? (
        <main>
          <SearchForm onSearch={handleSearch} />
          
          {/* Features Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-display text-lg font-semibold">Персональные рекомендации</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Алгоритм подбирает места на основе ваших предпочтений и интересов
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="font-display text-lg font-semibold">Видео о местах</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Смотрите видео и погружайтесь в атмосферу до поездки
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-travel-sunset/10">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-display text-lg font-semibold">Актуальные события</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Узнайте о фестивалях и мероприятиях в период вашей поездки
                </p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        searchFilters && (
          <ResultsPage filters={searchFilters} onBack={handleBack} />
        )
      )}
    </div>
  );
};

export default Index;
