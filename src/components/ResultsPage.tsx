import { useState } from "react";
import { ArrowLeft, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import InterestTags from "./InterestTags";
import DestinationCard from "./DestinationCard";
import { mockDestinations, interestTags as initialTags } from "@/data/mockData";
import { SearchFilters, InterestTag } from "@/types/travel";

interface ResultsPageProps {
  filters: SearchFilters;
  onBack: () => void;
}

const ResultsPage = ({ filters, onBack }: ResultsPageProps) => {
  const [tags, setTags] = useState<InterestTag[]>(initialTags);
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleTag = (id: string) => {
    setTags((prev) =>
      prev.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag
      )
    );
  };

  const formatDateRange = () => {
    if (!filters.startDate || !filters.endDate) return "";
    return `${format(filters.startDate, "d.MM.yyyy", { locale: ru })} - ${format(
      filters.endDate,
      "d.MM.yyyy",
      { locale: ru }
    )}`;
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Рекомендации для вас
              </h1>
              <p className="mt-1 text-muted-foreground">
                Отправление из: {filters.departureCity}, {formatDateRange()}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Новый поиск
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Фильтры
              </Button>
            </div>
          </div>

          {/* Interest Tags */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Ключевые интересы:
            </p>
            <InterestTags tags={tags} onToggle={handleToggleTag} />
          </div>

          {/* Active Filters Summary */}
          {(filters.withChildren || filters.description) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filters.withChildren && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
                  С детьми
                  <X className="h-3 w-3 cursor-pointer hover:text-accent/70" />
                </span>
              )}
              {filters.description && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  «{filters.description.slice(0, 30)}...»
                  <X className="h-3 w-3 cursor-pointer hover:text-primary/70" />
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Найдено <span className="font-semibold text-foreground">{mockDestinations.length}</span> мест
          </p>
        </div>

        <div className="space-y-6">
          {mockDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="px-12">
            Показать ещё
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
