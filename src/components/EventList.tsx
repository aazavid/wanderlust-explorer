import { Calendar, ExternalLink } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { TravelEvent } from "@/types/travel";

interface EventListProps {
  events: TravelEvent[];
}

const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">События в этом месте</h3>
      
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="group rounded-xl border border-border bg-secondary/30 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Calendar className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <button className="flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                
                <p className="mt-0.5 text-sm text-primary">
                  {format(parseISO(event.startDate), "d MMMM", { locale: ru })} -{" "}
                  {format(parseISO(event.endDate), "d MMMM yyyy", { locale: ru })}
                </p>
                
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
