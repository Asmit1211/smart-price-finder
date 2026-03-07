import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/40 py-8 mt-20">
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-display font-semibold text-foreground">
        <Zap className="w-4 h-4 text-primary" />
        PickSmartly
      </div>
      <p>© 2026 PickSmartly. Compare smarter, save bigger.</p>
    </div>
  </footer>
);

export default Footer;
