import { Zap, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          PickSmartly
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
