import { Brain, Cloud, Database, DollarSign, Expand, Globe, Headset, Layout, Lightbulb, Settings, Shield, Zap } from "lucide-react";

const features = [
  {
    name: "AI-Powered Analytics",
    description:
      "Harness the power of machine learning to derive actionable insights from your data.",
    icon: Brain,
  },
  {
    name: "Cloud-Native Architecture",
    description:
      "Scalable, resilient, and efficient solutions built for the modern cloud ecosystem.",
    icon: Cloud,
  },
    {
      "name": "Enterprise-Grade Security",
      "description": "State-of-the-art security measures to protect your most valuable assets.",
      "icon": Shield
    },
    {
      "name": "Scalable Solutions",
      "description": "Our systems grow with your business, ensuring seamless scalability.",
      "icon": Expand
    },
    {
      "name": "24/7 Customer Support",
      "description": "Round-the-clock assistance to ensure your operations run smoothly.",
      "icon": Headset
    },
    {
      "name": "Cloud Integration",
      "description": "Seamless integration with cloud platforms for enhanced flexibility.",
      "icon": Cloud
    },
    {
      "name": "Data-Driven Insights",
      "description": "Leverage advanced analytics to make informed business decisions.",
      "icon": Database
    },
    {
      "name": "User-Friendly Interface",
      "description": "Intuitive designs that simplify complex processes for all users.",
      "icon": Layout
    },
    {
      "name": "Automation Tools",
      "description": "Streamline workflows with intelligent automation solutions.",
      "icon": Settings
    },
    {
      "name": "Global Compliance",
      "description": "Adherence to international standards and regulations for seamless operations.",
      "icon": Globe
    },
    {
      "name": "Cost Efficiency",
      "description": "Maximize ROI with solutions designed to reduce operational costs.",
      "icon": DollarSign
    },
    {
      "name": "Innovation at Core",
      "description": "Stay ahead with cutting-edge technologies and forward-thinking strategies.",
      "icon": Lightbulb
    }
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-2">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Building Solutions
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Explore how Wider Bandwidth can revolutionize your business, company and organization through
          cutting-edge technology and innovative solutions
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
