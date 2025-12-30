import { MapPin, Calendar, Star, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VideoCarousel from "./VideoCarousel";
import EventList from "./EventList";
import { Destination } from "@/types/travel";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="animate-fade-up rounded-2xl border border-border bg-card shadow-soft transition-all duration-500 hover:shadow-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="grid gap-6 p-6 lg:grid-cols-5">
        {/* Left: Info Section */}
        <div className="space-y-4 lg:col-span-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={destination.image}
              alt={destination.name}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-card/90 px-2 py-1 text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4 fill-travel-sunset text-travel-sunset" />
              {destination.rating}
            </div>
          </div>

          {/* Title & Location */}
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {destination.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-accent">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {destination.location}, {destination.country}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Events Badge & Action */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              {destination.eventsCount} событий
            </div>
            
            <Button variant="outline" className="flex-1 gap-2">
              <Info className="h-4 w-4" />
              Подробнее
            </Button>
          </div>
        </div>

        {/* Right: Video & Events Section */}
        <div className="space-y-6 lg:col-span-3">
          <VideoCarousel videos={destination.videos} />
          
          {/* Expandable Events */}
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 text-left transition-colors hover:bg-secondary"
            >
              <span className="font-medium">
                События ({destination.events.length})
              </span>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isExpanded ? "mt-4 max-h-96" : "max-h-0"
              )}
            >
              <EventList events={destination.events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
