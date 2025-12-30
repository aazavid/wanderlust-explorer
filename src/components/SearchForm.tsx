import { useState } from "react";
import { CalendarIcon, MapPin, Users, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SearchFilters } from "@/types/travel";

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [departureCity, setDepartureCity] = useState("Москва");
  const [maxDistance, setMaxDistance] = useState([2000]);
  const [withChildren, setWithChildren] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      startDate: startDate || null,
      endDate: endDate || null,
      departureCity,
      maxDistance: maxDistance[0],
      withChildren,
      description,
    });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="gradient-hero pb-16 pt-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary via-travel-sunset to-accent bg-clip-text text-transparent">
              Откройте идеальное
            </span>
            <br />
            <span className="text-foreground">место для отдыха</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Персональные рекомендации путешествий на основе ваших предпочтений.
            Найдите направления, которые подходят именно вам, и посмотрите видео о своих будущих приключениях.
          </p>
        </div>
      </div>

      {/* Search Card */}
      <div className="container relative z-10 mx-auto -mt-8 px-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-xl font-semibold">
                Найдите идеальное место для отдыха
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Start Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Дата начала поездки</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Дата окончания поездки</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Departure City */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Место отправления</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="pl-10"
                    placeholder="Откуда вы едете?"
                  />
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Максимальное расстояние: {maxDistance[0].toLocaleString()} км
                </Label>
                <div className="px-2 pt-2">
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    min={100}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>100 км</span>
                    <span>5000 км</span>
                    <span>10000 км</span>
                  </div>
                </div>
              </div>
            </div>

            {/* With Children */}
            <div className="mt-6 flex items-center gap-3">
              <Switch
                id="with-children"
                checked={withChildren}
                onCheckedChange={setWithChildren}
              />
              <Label htmlFor="with-children" className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                Поездка с детьми
              </Label>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-2">
              <Label className="text-sm font-medium">Расскажите о желаемом отдыхе</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Например: Хочу спокойный отдых на природе с возможностью посещения исторических мест"
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Опишите, какой отдых вы хотите, и мы подберём подходящие места и видео
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="hero" size="xl" className="mt-8 w-full gap-2">
              <Sparkles className="h-5 w-5" />
              Найти идеальное место
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
