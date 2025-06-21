"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown, Target, TrendingUp, Users, Zap, ArrowRight, Play } from "lucide-react"

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}

export default function TrepaLanding() {
  const [sliderValue, setSliderValue] = useState(4.2)
  const [isVisible, setIsVisible] = useState(false)

  const { ref: precisionRef, isVisible: precisionVisible } = useScrollAnimation()
  const { ref: howItWorksRef, isVisible: howItWorksVisible } = useScrollAnimation()
  const { ref: comparisonRef, isVisible: comparisonVisible } = useScrollAnimation()
  const { ref: leaderboardRef, isVisible: leaderboardVisible } = useScrollAnimation()
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation()

  useEffect(() => {
    setIsVisible(true)
    // Animate slider value
    const interval = setInterval(() => {
      setSliderValue((prev) => {
        const newValue = prev + (Math.random() - 0.5) * 0.3
        return Math.max(3.0, Math.min(6.0, newValue))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white overflow-x-hidden">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Image src="/trepa-logo-white.webp" alt="Trepa Logo" width={120} height={40} className="h-8 w-auto" />
          <Button className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] hover:from-[#14F0F0]/80 hover:to-[#A259FF]/80 text-black font-semibold px-6 py-2 text-sm rounded-full transition-all duration-300 hover:scale-105">
            Join Beta
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14F0F0]/10 via-transparent to-[#A259FF]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,240,240,0.1),transparent_50%)]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Don't Just Be{" "}
              <span className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] bg-clip-text text-transparent">Right</span>
              .<br />
              Be{" "}
              <span className="bg-gradient-to-r from-[#FF4C4C] to-[#A259FF] bg-clip-text text-transparent">
                Precise
              </span>
              .
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Trepa rewards accuracy, not just correctness. Slide, stake, and get paid based on how close you are.
            </p>

            {/* Interactive Slider Demo */}
            <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#14F0F0]/5 to-[#A259FF]/5 border border-[#14F0F0]/20 backdrop-blur-sm max-w-md mx-auto">
              <div className="text-sm text-gray-400 mb-4">Inflation Rate Prediction</div>
              <div className="relative">
                <input
                  type="range"
                  min="3"
                  max="6"
                  step="0.1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number.parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-glow"
                />
                <div className="text-2xl font-bold text-[#14F0F0] mt-4">{sliderValue.toFixed(1)}%</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] hover:from-[#14F0F0]/80 hover:to-[#A259FF]/80 text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(20,240,240,0.5)]">
                Join Beta
              </Button>
              <Button
  variant="outline"
  onClick={() => {
    const el = document.getElementById("how-it-works")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }}
  className="border-[#14F0F0]/50 text-[#14F0F0] hover:bg-[#14F0F0]/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
>
  <Play className="w-5 h-5 mr-2" />
  See How It Works
</Button>

            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#14F0F0]" />
        </div>
      </section>

      {/* Precision Predictions Explained */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              ref={precisionRef}
              className={`transition-all duration-1000 ${precisionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Most platforms are <span className="text-[#FF4C4C]">binary</span>:<br />
                Right or wrong.
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Trepa pays based on closeness — a smarter, fairer game where precision matters more than luck.
              </p>
              <div className="text-lg text-[#14F0F0] font-semibold">Almost right should still mean something.</div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-[#14F0F0]/10 to-[#A259FF]/10 border-[#14F0F0]/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-400 mb-2">Stock Price Prediction</div>
                    <div className="text-2xl font-bold text-[#14F0F0]">Actual: $100,000</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-[#14F0F0]/5 border border-[#14F0F0]/20">
                      <span>User A: $98,000</span>
                      <span className="text-[#14F0F0] font-semibold">$850 payout</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-[#A259FF]/5 border border-[#A259FF]/20">
                      <span>User B: $100,500</span>
                      <span className="text-[#A259FF] font-semibold">$950 payout</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-[#FF4C4C]/5 border border-[#FF4C4C]/20">
                      <span>User C: $105,000</span>
                      <span className="text-[#FF4C4C] font-semibold">$200 payout</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-24 py-20 px-4 bg-gradient-to-b from-transparent to-[#14F0F0]/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            ref={howItWorksRef}
            className={`text-4xl md:text-5xl font-bold mb-16 transition-all duration-1000 ${howItWorksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            How It{" "}
            <span className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] bg-clip-text text-transparent">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#14F0F0] to-[#A259FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Slide to Predict</h3>
              <p className="text-gray-300 leading-relaxed">
                Use our precision slider to make your numeric prediction. Every decimal matters.
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#A259FF] to-[#FF4C4C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Stake Your Forecast</h3>
              <p className="text-gray-300 leading-relaxed">
                Choose your stake amount. Higher confidence, higher potential rewards.
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#FF4C4C] to-[#14F0F0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Earn Based on Precision</h3>
              <p className="text-gray-300 leading-relaxed">
                Get paid proportionally to how close your prediction was to reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Old Way vs Trepa */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={comparisonRef}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${comparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Why Precision <span className="text-[#14F0F0]">Matters</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#FF4C4C]/10 to-[#FF4C4C]/5 border-[#FF4C4C]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-[#FF4C4C]">Traditional Markets</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#FF4C4C]/10 border border-[#FF4C4C]/20">
                    <div className="text-lg font-semibold">Your Guess: 99,999</div>
                    <div className="text-lg font-semibold">Actual Outcome: 100,001</div>
                    <div className="text-2xl font-bold text-[#FF4C4C] mt-2">💢 You Lose Everything</div>
                  </div>
                  <p className="text-black font-mono">Off by 0.002%? Too bad. Binary thinking doesn't reward skill.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#14F0F0]/10 to-[#A259FF]/10 border-[#14F0F0]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-[#14F0F0]">Trepa</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#14F0F0]/10 border border-[#14F0F0]/20">
                    <div className="text-lg font-semibold">Your Guess: 99,999</div>
                    <div className="text-lg font-semibold">Actual Outcome: 100,001</div>
                    <div className="text-2xl font-bold text-[#14F0F0] mt-2">     ✅ You Get Paid $947</div>
                  </div>
                  <p className="text-black font-mono">
                    Incredible accuracy deserves incredible rewards. Precision pays.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#A259FF]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={leaderboardRef}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${leaderboardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Users className="w-12 h-12 inline-block mr-4 text-[#A259FF]" />
            Top Precision Players This Week
          </h2>

          <Card className="bg-gradient-to-br from-[#A259FF]/10 to-[#14F0F0]/10 border-[#A259FF]/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-4">
                {[
                  { rank: 1, name: "PrecisionKing", accuracy: "99.97%", payout: "$2,847" },
                  { rank: 2, name: "DataWhisperer", accuracy: "99.94%", payout: "$2,203" },
                  { rank: 3, name: "NumberNinja", accuracy: "99.91%", payout: "$1,956" },
                  { rank: 4, name: "TrendMaster", accuracy: "99.87%", payout: "$1,742" },
                  { rank: 5, name: "ForecastPro", accuracy: "99.83%", payout: "$1,589" },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#14F0F0] to-[#A259FF] flex items-center justify-center text-black font-bold">
                        {player.rank}
                      </div>
                      <span className="font-semibold">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-[#14F0F0]">{player.accuracy}</span>
                      <span className="text-[#A259FF] font-bold">{player.payout}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={testimonialsRef}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            What Early Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Finally, a place where accuracy matters. I've made more in a week than months of traditional trading.",
                name: "Sarah K.",
                role: "Data Analyst",
              },
              {
                quote: "Way more rewarding than guessing games. My statistical background actually pays off here.",
                name: "Marcus R.",
                role: "Economist",
              },
              {
                quote: "The precision-based payouts are genius. Close predictions shouldn't be worthless.",
                name: "Elena V.",
                role: "Researcher",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-8">
                  <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-[#14F0F0]">{testimonial.name}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[#14F0F0]/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "What is Trepa?",
                answer:
                  "Trepa is the world's first precision prediction platform. Instead of binary right/wrong outcomes, we reward users based on how close their predictions are to reality.",
              },
              {
                question: "How are payouts calculated?",
                answer:
                  "Payouts are calculated based on your prediction's proximity to the actual outcome. The closer you are, the higher your reward. Our algorithm ensures fair distribution based on accuracy.",
              },
              {
                question: "Do I need crypto or special wallets?",
                answer:
                  "No! Trepa works with traditional payment methods. No crypto knowledge, wallets, or tokens required. Just sign up and start predicting.",
              },
              {
                question: "What kinds of predictions can I make?",
                answer:
                  "We cover economic indicators, stock prices, sports statistics, weather data, and more. All predictions involve numeric outcomes where precision matters.",
              },
              {
                question: "How do I join the beta?",
                answer:
                  "Click 'Join Beta' to get early access. We're currently onboarding users in waves to ensure the best experience for everyone.",
              },
              {
                question: "Is there a minimum stake amount?",
                answer:
                  "You can start with as little as $10. We believe everyone should have access to precision-based rewards, regardless of budget.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/20 bg-white/5 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-[#14F0F0] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-[#14F0F0]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Precision Pays.
            <br />
            <span className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] bg-clip-text text-transparent">
              Are You Ready?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Get early access. Start earning from your foresight.
          </p>

          <Button
            variant="primary"
            className="bg-gradient-to-r from-[#14F0F0] to-[#A259FF] hover:from-[#14F0F0]/80 hover:to-[#A259FF]/80 text-black font-bold px-12 py-6 text-xl rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(20,240,240,0.5)] mb-4 shadow-md"
          >
            Join Beta Now
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>

          <p className="text-sm text-gray-400">Get early access. Start earning from your foresight.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Image
              src="/trepa-logo-white.webp"
              alt="Trepa Logo"
              width={120}
              height={40}
              className="h-8 w-auto mb-4 md:mb-0"
            />
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-[#14F0F0] transition-colors">
                About
              </a>
              <a href="#" className="hover:text-[#14F0F0] transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-[#14F0F0] transition-colors">
                Legal
              </a>
              <a href="#" className="hover:text-[#14F0F0] transition-colors">
                Privacy
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-8">© 2024 Trepa. All rights reserved.</div>
        </div>
      </footer>

      <style jsx>{`
        .slider-glow::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #14F0F0, #A259FF);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(20, 240, 240, 0.5);
        }
        
        .slider-glow::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #14F0F0, #A259FF);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(20, 240, 240, 0.5);
        }
      `}</style>
    </div>
  )
}
