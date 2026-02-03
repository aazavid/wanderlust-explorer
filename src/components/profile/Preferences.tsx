import { useState } from "react";
import { Compass, DollarSign, Sun, Heart, XCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockUserPreferences,
  travelStyleOptions,
  interestOptions,
  seasonOptions,
} from "@/data/mockUserData";
import { cn } from "@/lib/utils";

const budgetLabels = {
  low: "Бюджетный",
  medium: "Средний",
  high: "Комфорт",
  luxury: "Люкс",
};

const Preferences = () => {
  const [preferences, setPreferences] = useState(mockUserPreferences);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleArrayItem = (
    key: "travelStyle" | "interests" | "preferredSeasons" | "avoidCategories",
    value: string
  ) => {
    setPreferences((prev) => {
      const arr = prev[key];
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: newArr };
    });
    setHasChanges(true);
  };

  const setBudget = (value: typeof preferences.budgetRange) => {
    setPreferences((prev) => ({ ...prev, budgetRange: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save
    console.log("Saving preferences:", preferences);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Мои предпочтения</h1>
          <p className="mt-1 text-muted-foreground">
            Настройте рекомендации под себя
          </p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Сохранить изменения
          </Button>
        )}
      </div>

      {/* Travel Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            Стиль путешествий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {travelStyleOptions.map((style) => (
              <Badge
                key={style}
                variant={preferences.travelStyle.includes(style) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1.5 text-sm transition-all",
                  preferences.travelStyle.includes(style)
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleArrayItem("travelStyle", style)}
              >
                {style}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Бюджет
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(Object.keys(budgetLabels) as Array<keyof typeof budgetLabels>).map((key) => (
              <button
                key={key}
                onClick={() => setBudget(key)}
                className={cn(
                  "rounded-xl border-2 p-4 text-center transition-all duration-200",
                  preferences.budgetRange === key
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className="flex justify-center">
                  {Array.from({ length: key === "low" ? 1 : key === "medium" ? 2 : key === "high" ? 3 : 4 }).map((_, i) => (
                    <DollarSign
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        preferences.budgetRange === key ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium">{budgetLabels[key]}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferred Seasons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            Предпочтительные сезоны
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {seasonOptions.map((season) => (
              <Badge
                key={season}
                variant={preferences.preferredSeasons.includes(season) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm transition-all",
                  preferences.preferredSeasons.includes(season)
                    ? "bg-accent hover:bg-accent/90"
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleArrayItem("preferredSeasons", season)}
              >
                {season}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Интересы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <Badge
                key={interest}
                variant={preferences.interests.includes(interest) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1.5 text-sm transition-all",
                  preferences.interests.includes(interest)
                    ? "bg-travel-sunset text-white hover:bg-travel-sunset/90"
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleArrayItem("interests", interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Avoid Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            Исключить из рекомендаций
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[...travelStyleOptions, ...interestOptions].map((item) => (
              <Badge
                key={item}
                variant={preferences.avoidCategories.includes(item) ? "destructive" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1.5 text-sm transition-all",
                  preferences.avoidCategories.includes(item)
                    ? ""
                    : "hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                )}
                onClick={() => toggleArrayItem("avoidCategories", item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;
