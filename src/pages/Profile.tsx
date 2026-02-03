import { useState } from "react";
import { User, Heart, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileSettings from "@/components/profile/ProfileSettings";
import SavedPlaces from "@/components/profile/SavedPlaces";
import Companions from "@/components/profile/Companions";
import Preferences from "@/components/profile/Preferences";
import { useNavigate } from "react-router-dom";

type TabId = "profile" | "saved" | "companions" | "preferences";

interface MenuItem {
  id: TabId;
  label: string;
  icon: typeof User;
}

const menuItems: MenuItem[] = [
  { id: "profile", label: "Профиль", icon: User },
  { id: "saved", label: "Сохранённые", icon: Heart },
  { id: "companions", label: "Попутчики", icon: Users },
  { id: "preferences", label: "Предпочтения", icon: Settings },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "saved":
        return <SavedPlaces />;
      case "companions":
        return <Companions />;
      case "preferences":
        return <Preferences />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen flex-col border-r border-sidebar-border bg-sidebar-background transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo/Back */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!sidebarCollapsed && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sidebar-foreground transition-colors hover:text-sidebar-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="font-medium">На главную</span>
            </button>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
              sidebarCollapsed && "mx-auto"
            )}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              sidebarCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Выйти</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-4xl px-6 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Profile;
