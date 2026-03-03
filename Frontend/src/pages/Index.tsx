import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Brain, ShieldCheck, Activity, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-heart.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our Random Forest model analyzes 13 clinical parameters to assess heart disease risk with high accuracy.",
  },
  {
    icon: Activity,
    title: "Real-Time Prediction",
    description: "Get instant results with probability scores to understand your cardiovascular risk level.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence-Based",
    description: "Built on the UCI Heart Disease dataset, validated by medical research and clinical studies.",
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt="Heart visualization" className="w-full h-full object-cover" />
        </div>
        <div className="relative container py-24 md:py-36 space-y-6 max-w-3xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm">
            <Heart className="h-4 w-4" />
            AI-Powered Heart Health
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Predict Heart Disease <br className="hidden md:block" />
            <span className="text-accent">Before It Strikes</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto">
            Leverage machine learning to assess cardiovascular risk using 13 clinical parameters. Fast, accurate, and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/predict">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Start Prediction <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our system uses advanced machine learning to analyze clinical data and predict heart disease risk.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-6 space-y-4 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-2xl bg-primary p-10 md:p-16 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Check Your Heart Health?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Enter your clinical parameters and get an instant AI-powered prediction.
          </p>
          <Link to="/predict">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
