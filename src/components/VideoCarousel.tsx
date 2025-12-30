import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoItem } from "@/types/travel";
import { cn } from "@/lib/utils";

interface VideoCarouselProps {
  videos: VideoItem[];
}

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (videos.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">Видео о месте</h3>
      
      {/* Main Video */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="aspect-video">
          <img
            src={videos[currentIndex].thumbnail}
            alt={videos[currentIndex].title}
            className="h-full w-full object-cover"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-all duration-300 hover:bg-foreground/30">
            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elevated transition-all duration-300 hover:scale-110 hover:bg-primary">
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
            <h4 className="font-medium text-card">{videos[currentIndex].title}</h4>
          </div>
          
          {/* External Link */}
          <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-card/90 text-foreground transition-all hover:bg-card">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        
        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300",
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
