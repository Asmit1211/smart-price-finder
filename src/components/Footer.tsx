import { Zap, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/40 py-12 mt-20">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            PickSmartly
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your smart shopping assistant. Compare prices across quick-commerce platforms and save on everyday essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#categories" className="hover:text-foreground transition-colors">Categories</a></li>
            <li><a href="#products" className="hover:text-foreground transition-colors">Products</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="font-display font-semibold mb-3">Platforms</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Blinkit</li>
            <li>Flipkart Minutes</li>
            <li>Swiggy Instamart</li>
            <li>Zepto</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              help@picksmartly.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Mumbai, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 PickSmartly. Compare smarter, save bigger.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
