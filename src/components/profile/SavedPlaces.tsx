import { Heart, MapPin, Star, Trash2, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockSavedPlaces } from "@/data/mockUserData";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const SavedPlaces = () => {
  const handleRemove = (id: string) => {
    // Mock remove - in real app would update backend
    console.log("Remove place:", id);
  };

  const handleShare = (id: string) => {
    // Mock share
    console.log("Share place:", id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Сохранённые места</h1>
        <p className="mt-1 text-muted-foreground">
          {mockSavedPlaces.length} направлений в избранном
        </p>
      </div>

      {mockSavedPlaces.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold">Пока ничего не сохранено</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Нажмите на сердечко на карточке места, чтобы добавить его в избранное
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {mockSavedPlaces.map((saved) => (
            <Card
              key={saved.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-card"
            >
              <div className="relative">
                <img
                  src={saved.destination.image}
                  alt={saved.destination.name}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-lg font-bold text-white">
                    {saved.destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="h-3 w-3" />
                    {saved.destination.country}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-travel-sunset text-travel-sunset" />
                      {saved.destination.rating}
                    </span>
                  </div>
                </div>
                <div className="absolute right-3 top-3 flex gap-2">
                  <button
                    onClick={() => handleShare(saved.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(saved.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-destructive backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {saved.notes && (
                      <p className="text-sm text-muted-foreground">{saved.notes}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Сохранено{" "}
                      {format(new Date(saved.savedAt), "d MMMM yyyy", { locale: ru })}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Открыть
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {saved.destination.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPlaces;
