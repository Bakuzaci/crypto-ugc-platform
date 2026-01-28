// examples/components/HeroSection.tsx
// Landing page hero section inspired by Noise design

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-zinc-950">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-zinc-300">
            Now live: Crypto UGC marketplace
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Make your project</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            go mega viral
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Achieve explosive growth with an army of pay-as-you-go UGC creators.
          <span className="text-white"> Built for crypto.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6 h-auto"
            asChild
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-lg px-8 py-6 h-auto"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <StatItem value="2.5B" label="views generated" />
          <StatItem value="30M" label="conversions driven" />
          <StatItem value="$200M" label="TVL unlocked" />
          <StatItem value="$0.60" label="average CPA" />
        </div>
      </div>

      {/* Floating elements (decorative) */}
      <div className="absolute bottom-10 left-10 opacity-40">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 animate-float" />
      </div>
      <div className="absolute top-20 right-20 opacity-40">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 animate-float-delayed" />
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </div>
  );
}

// Add these animations to your tailwind.config.js:
//
// theme: {
//   extend: {
//     animation: {
//       'float': 'float 6s ease-in-out infinite',
//       'float-delayed': 'float 6s ease-in-out infinite 2s',
//     },
//     keyframes: {
//       float: {
//         '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
//         '50%': { transform: 'translateY(-20px) rotate(5deg)' },
//       },
//     },
//   },
// }
