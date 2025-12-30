import { cn } from "@/lib/utils";
import { InterestTag } from "@/types/travel";

interface InterestTagsProps {
  tags: InterestTag[];
  onToggle: (id: string) => void;
}

const InterestTags = ({ tags, onToggle }: InterestTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onToggle(tag.id)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
            tag.active
              ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
              : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};

export default InterestTags;
