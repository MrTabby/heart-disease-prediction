import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
    <div className="container text-center space-y-2">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <Heart className="h-4 w-4 text-primary fill-primary/20" />
        <span>CardioPredict</span>
      </div>
      <p className="text-xs text-muted-foreground">
        AI-powered heart disease prediction. For educational purposes only — not a substitute for medical advice.
      </p>
      <p className="text-xs text-muted-foreground">© 2026 CardioPredict. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
