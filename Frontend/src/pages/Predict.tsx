import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Heart, User, Gauge, Droplets, Zap, Activity, TrendingUp, GitBranch, Scan, ArrowRight, CheckCircle2, AlertTriangle, Loader2,
} from "lucide-react";

const schema = z.object({
  age: z.coerce.number().min(1).max(120),
  sex: z.string().min(1, "Required"),
  cp: z.string().min(1, "Required"),
  trestbps: z.coerce.number().min(50).max(300),
  chol: z.coerce.number().min(50).max(600),
  fbs: z.string().min(1, "Required"),
  restecg: z.string().min(1, "Required"),
  thalach: z.coerce.number().min(50).max(250),
  exang: z.string().min(1, "Required"),
  oldpeak: z.coerce.number().min(0).max(10),
  slope: z.string().min(1, "Required"),
  ca: z.string().min(1, "Required"),
  thal: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof schema>;

interface PredictionResult {
  prediction: number;
  probability: number;
}

const fieldGroups = [
  {
    title: "Patient Info",
    fields: [
      { name: "age" as const, label: "Age", type: "number", icon: User, placeholder: "e.g. 55" },
      {
        name: "sex" as const, label: "Sex", type: "select", icon: User,
        options: [{ v: "1", l: "Male" }, { v: "0", l: "Female" }],
      },
    ],
  },
  {
    title: "Cardiac Metrics",
    fields: [
      {
        name: "cp" as const, label: "Chest Pain Type", type: "select", icon: Heart,
        options: [
          { v: "0", l: "Typical Angina" }, { v: "1", l: "Atypical Angina" },
          { v: "2", l: "Non-anginal Pain" }, { v: "3", l: "Asymptomatic" },
        ],
      },
      { name: "trestbps" as const, label: "Resting BP (mm Hg)", type: "number", icon: Gauge, placeholder: "e.g. 120" },
      { name: "chol" as const, label: "Cholesterol (mg/dl)", type: "number", icon: Droplets, placeholder: "e.g. 200" },
      {
        name: "fbs" as const, label: "Fasting Blood Sugar > 120", type: "select", icon: Zap,
        options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }],
      },
      {
        name: "restecg" as const, label: "Resting ECG", type: "select", icon: Activity,
        options: [
          { v: "0", l: "Normal" }, { v: "1", l: "ST-T Abnormality" }, { v: "2", l: "LV Hypertrophy" },
        ],
      },
      { name: "thalach" as const, label: "Max Heart Rate", type: "number", icon: Activity, placeholder: "e.g. 150" },
    ],
  },
  {
    title: "Exercise & Additional",
    fields: [
      {
        name: "exang" as const, label: "Exercise Induced Angina", type: "select", icon: TrendingUp,
        options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }],
      },
      { name: "oldpeak" as const, label: "ST Depression (Oldpeak)", type: "number", icon: TrendingUp, placeholder: "e.g. 1.5" },
      {
        name: "slope" as const, label: "Slope of Peak ST", type: "select", icon: GitBranch,
        options: [{ v: "0", l: "Upsloping" }, { v: "1", l: "Flat" }, { v: "2", l: "Downsloping" }],
      },
      {
        name: "ca" as const, label: "Major Vessels (0-3)", type: "select", icon: GitBranch,
        options: [{ v: "0", l: "0" }, { v: "1", l: "1" }, { v: "2", l: "2" }, { v: "3", l: "3" }],
      },
      {
        name: "thal" as const, label: "Thalassemia", type: "select", icon: Scan,
        options: [{ v: "1", l: "Normal" }, { v: "2", l: "Fixed Defect" }, { v: "3", l: "Reversible Defect" }],
      },
    ],
  },
];

const Predict = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      age: data.age,
      sex: Number(data.sex),
      cp: Number(data.cp),
      trestbps: data.trestbps,
      chol: data.chol,
      fbs: Number(data.fbs),
      restecg: Number(data.restecg),
      thalach: data.thalach,
      exang: Number(data.exang),
      oldpeak: data.oldpeak,
      slope: Number(data.slope),
      ca: Number(data.ca),
      thal: Number(data.thal),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      setResult({ prediction: json.prediction, probability: json.probability });
    } catch {
      setError("Could not reach the prediction server. Make sure your FastAPI backend is running on /predict.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="container text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold">Heart Disease Prediction</h1>
          <p className="text-primary-foreground/80">
            Enter your clinical parameters below to get an AI-powered risk assessment.
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {fieldGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">{group.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.fields.map((field) => {
                  const err = errors[field.name];
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <Label className="flex items-center gap-1.5 text-sm">
                        <field.icon className="h-3.5 w-3.5 text-primary" />
                        {field.label}
                      </Label>
                      {field.type === "number" ? (
                        <Input
                          type="number"
                          step="any"
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          className={err ? "border-destructive" : ""}
                        />
                      ) : (
                        <Select onValueChange={(v) => setValue(field.name, v, { shouldValidate: true })}>
                          <SelectTrigger className={err ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options!.map((o) => (
                              <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {err && <p className="text-xs text-destructive">{err.message || "Required"}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {loading ? "Analyzing..." : "Get Prediction"}
          </Button>
        </form>

        {/* Result */}
        {result && (
          <div
            className={`mt-8 rounded-xl p-6 text-center space-y-3 border ${
              result.prediction === 1
                ? "bg-destructive/5 border-destructive/30"
                : "bg-success/5 border-success/30"
            }`}
          >
            {result.prediction === 1 ? (
              <AlertTriangle className="h-10 w-10 text-destructive mx-auto" />
            ) : (
              <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
            )}
            <h3 className="text-xl font-bold">
              {result.prediction === 1 ? "Heart Disease Detected" : "No Heart Disease Detected"}
            </h3>
            <p className="text-muted-foreground text-sm">
              Probability: <span className="font-semibold">{(result.probability * 100).toFixed(1)}%</span>
            </p>
            <p className="text-xs text-muted-foreground">
              This is an AI prediction for educational purposes only. Please consult a healthcare professional.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl p-6 text-center bg-warning/5 border border-warning/30 space-y-2">
            <AlertTriangle className="h-8 w-8 text-warning mx-auto" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Predict;
