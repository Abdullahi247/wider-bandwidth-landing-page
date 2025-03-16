"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Link, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Ball class to handle individual ball properties and movement
class Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;

  constructor(
    x: number,
    y: number,
    radius: number,
    dx: number,
    dy: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvas: HTMLCanvasElement) {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw(canvas.getContext("2d")!);
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);

  // Initialize balls on component mount
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create balls
    const colors = [
      "rgba(59, 130, 246, 0.3)",
      "rgba(139, 92, 246, 0.3)",
      "rgba(236, 72, 153, 0.3)",
    ];
    const newBalls: Ball[] = [];

    // Create 15 balls with random properties
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 40 + 10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      newBalls.push(new Ball(x, y, radius, dx, dy, color));
    }

    setBalls(newBalls);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      newBalls.forEach((ball) => {
        ball.update(canvas);
      });
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="container relative flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden">
      {/* Canvas for bouncing balls */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Background Avatars */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/placeholder.svg?height=80&width=80"
          alt=""
          className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full border-2 border-primary/20 opacity-60 animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <img
          src="/placeholder.svg?height=100&width=100"
          alt=""
          className="absolute top-[70%] left-[15%] w-24 h-24 rounded-full border-2 border-primary/20 opacity-50 animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <img
          src="/placeholder.svg?height=120&width=120"
          alt=""
          className="absolute top-[20%] right-[12%] w-28 h-28 rounded-full border-2 border-primary/20 opacity-40 animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <img
          src="/placeholder.svg?height=90&width=90"
          alt=""
          className="absolute top-[60%] right-[18%] w-20 h-20 rounded-full border-2 border-primary/20 opacity-60 animate-pulse"
          style={{ animationDuration: "7s" }}
        />
        <img
          src="/placeholder.svg?height=70&width=70"
          alt=""
          className="absolute top-[40%] left-[25%] w-16 h-16 rounded-full border-2 border-primary/20 opacity-70 animate-pulse"
          style={{ animationDuration: "3.5s" }}
        />
        <img
          src="/placeholder.svg?height=110&width=110"
          alt=""
          className="absolute top-[30%] right-[30%] w-24 h-24 rounded-full border-2 border-primary/20 opacity-50 animate-pulse"
          style={{ animationDuration: "5.5s" }}
        />
      </div>

      {/* Content */}
      <div className="space-y-4 relative z-10">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Your Partner in Cutting-Edge Solutions
          <br />
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-sm sm:leading-8">
          - Portfolio owned by Abdullahi Yusuf
        </p>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Explore how I leverage advanced technology and creative
          problem-solving to drive impactful results over the past few years.
          Let’s transform ideas into reality, faster and smarter.
        </p>
      </div>

      <div className="flex gap-4 relative z-10">
        <Button size="lg">
          Explore Solutions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={() =>
            window.open("https://calendly.com/tsmart247", "_blank")
          }
          variant="outline"
          size="lg"
        >
          Schedule a Demo
        </Button>
        <Button
          onClick={() => (window.location.href = "tel:+447881163348")}
          size="lg"
        >
          Contact Sales
          <PhoneCall className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Project Cards */}
      <div className="space-y-24">
        <div className="w-full max-w-5xl mt-16 relative z-10">
          <h2 className="text-2xl font-bold mb-8">Our Past Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card 1 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 items-center justify-center">
                <div>
                  <div className="text-2xl font-bold text-primary/70">
                    AI (Artificial Intelligence)
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">
                  AI Agents and Chatbots
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  AI-powered agents solution for tackling productivity,
                  increasing sales forecasting accuracy and automating processes
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Machine Learning
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Big Data
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Cloud
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Artificial Intelligence
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Bots
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Agents
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 items-center justify-center">
                <div className="text-2xl font-bold text-primary/70">
                  Computer Vision
                </div>
                <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Smart Visual Systems</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Computer Vision based monitoring and optimization platform
                  that reduced operational costs, increasing productivity and
                  anti-theft.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    IoT
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Real-time Analytics
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Edge Computing
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Image Masking
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 items-center justify-center">
                <div className="text-2xl font-bold text-primary/70">
                  Fintech
                </div>
                <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">
                  Web3 Blockchain Payment Solution
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Secure, scalable payment processing system transactions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Blockchain
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Fintech
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Security
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 items-center justify-center">
                <div className="text-2xl font-bold text-primary/70">
                  Ecommerce
                </div>
                <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">
                  Marketplace Solutions
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Buying and Selling platform, reaching end customers with a
                  user friendly platform
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Blockchain
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Fintech
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Security
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 items-center justify-center">
                <div className="text-2xl font-bold text-primary/70">
                  Healthcare & Biotechnology
                </div>
                <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Healthcare Solutions</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Developed a secure, scalable telemedicine platform enabling
                  remote patient consultations and real-time health monitoring
                  system
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    EMR
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Health
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Booking Systems
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20  items-center justify-center">
                <div className="text-2xl font-bold text-primary/70">
                  Automotive & Transportation
                </div>
                <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      GitHub Source Code
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold text-primary/70">
                    <Button variant="ghost" size="icon">
                      Live Demo
                      <Link className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Automotive Solutions</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Designed an intelligent traffic management system using AI to
                  optimize urban traffic flow and reduce road congestion
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Automotive
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Road Traffic
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                    Mobile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
