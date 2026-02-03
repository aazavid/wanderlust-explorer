import { MapPin, Star, Calendar, Play, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Destination } from "@/types/travel";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface DestinationDetailsProps {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DestinationDetails = ({ destination, open, onOpenChange }: DestinationDetailsProps) => {
  if (!destination) return null;

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "d MMM yyyy", { locale: ru });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 overflow-hidden">
        <ScrollArea className="h-full">
          {/* Hero Image */}
          <div className="relative h-64 w-full">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Rating Badge */}
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-lg bg-card/90 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4 fill-travel-sunset text-travel-sunset" />
              {destination.rating}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="font-display text-3xl font-bold text-white">
                {destination.name}
              </h2>
              <div className="mt-1 flex items-center gap-1 text-white/90">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {destination.location}, {destination.country}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {destination.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">О месте</h3>
              <p className="text-muted-foreground leading-relaxed">
                {destination.description}
              </p>
            </div>

            <Separator />

            {/* Events Section */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                События ({destination.events.length})
              </h3>
              <div className="space-y-3">
                {destination.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                  >
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <p className="mt-1 text-sm text-primary font-medium">
                      {formatDate(event.startDate)} — {formatDate(event.endDate)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                ))}
                {destination.events.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Событий пока нет
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Videos Section */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Play className="h-5 w-5 text-accent" />
                Видео ({destination.videos.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {destination.videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                        <Play className="h-5 w-5 fill-primary text-primary ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-xs font-medium text-white line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button variant="hero" size="xl" className="w-full">
                Запланировать поездку
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DestinationDetails;
