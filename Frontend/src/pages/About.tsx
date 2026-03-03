import { Heart, Brain, Database, BarChart3, Stethoscope, AlertTriangle } from "lucide-react";

const facts = [
  { icon: AlertTriangle, stat: "17.9M", label: "Deaths per year from cardiovascular disease globally" },
  { icon: Heart, stat: "#1", label: "Leading cause of death worldwide" },
  { icon: Stethoscope, stat: "80%", label: "Of heart disease cases are preventable" },
];

const steps = [
  { icon: Database, title: "Data Collection", description: "13 clinical parameters are collected including age, cholesterol, blood pressure, and ECG results." },
  { icon: Brain, title: "ML Processing", description: "A Random Forest classifier processes the data through hundreds of decision trees for robust predictions." },
  { icon: BarChart3, title: "Risk Assessment", description: "The model outputs a probability score and classification — heart disease detected or not." },
];

const About = () => (
  <div>
    {/* Header */}
    <section className="hero-gradient text-primary-foreground py-16">
      <div className="container text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">About CardioPredict</h1>
        <p className="text-primary-foreground/80 text-lg">
          Understanding heart disease and how AI can help detect it early.
        </p>
      </div>
    </section>

    {/* What is heart disease */}
    <section className="container py-16 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">What is Heart Disease?</h2>
      <p className="text-muted-foreground leading-relaxed">
        Heart disease refers to several types of conditions affecting the heart, including coronary artery disease,
        heart rhythm problems (arrhythmias), and heart defects. It remains the leading cause of death globally,
        but early detection and lifestyle changes can significantly reduce risk.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Key risk factors include high blood pressure, high cholesterol, smoking, diabetes, obesity,
        and physical inactivity. Many of these can be measured and monitored through clinical tests.
      </p>
    </section>

    {/* Stats */}
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {facts.map((f) => (
            <div key={f.label} className="glass-card rounded-xl p-6 text-center space-y-2">
              <f.icon className="h-8 w-8 text-primary mx-auto" />
              <div className="text-3xl font-extrabold text-gradient">{f.stat}</div>
              <p className="text-sm text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How the model works */}
    <section className="container py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">How Our ML Model Works</h2>
      <div className="space-y-6">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-4 items-start">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 glass-card rounded-xl p-6 space-y-2">
        <h3 className="font-semibold">About Random Forest</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Random Forest is an ensemble learning method that constructs multiple decision trees during training
          and outputs the mode of their predictions. It's highly effective for medical classification tasks
          due to its resistance to overfitting and ability to handle mixed data types.
        </p>
      </div>
    </section>
  </div>
);

export default About;
