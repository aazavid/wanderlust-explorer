import { Compass, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header = ({ showBackButton, onBack }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">WayFinder</span>
        </div>
        
        <nav className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" onClick={onBack} className="gap-2">
              ← Новый поиск
            </Button>
          )}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => navigate("/profile")}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Личный кабинет</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
