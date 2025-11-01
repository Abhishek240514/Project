import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Briefcase, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Header({ onCreateTeam }) {
  const [location] = useLocation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer" data-testid="link-home">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TeamHub</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link href="/">
                <Button
                  variant={location === "/" ? "default" : "ghost"}
                  className="gap-2"
                  data-testid="link-members"
                >
                  <Users className="h-4 w-4" />
                  Browse Members
                </Button>
              </Link>
              <Link href="/teams">
                <Button
                  variant={location === "/teams" ? "default" : "ghost"}
                  className="gap-2"
                  data-testid="link-teams"
                >
                  <Briefcase className="h-4 w-4" />
                  My Teams
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={onCreateTeam}
              className="gap-2"
              data-testid="button-create-team-header"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Team</span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Avatar className="h-10 w-10" data-testid="avatar-user">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
