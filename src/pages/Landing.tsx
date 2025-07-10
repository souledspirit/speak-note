import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ava R.",
    quote: "SpeakNote has made note-taking effortless for me. The voice-to-text is super accurate!",
  },
  {
    name: "Ben S.",
    quote: "As someone with dyslexia, SpeakNote is a game changer. I can listen to my notes anytime.",
  },
  {
    name: "Priya K.",
    quote: "The accessibility features are top-notch. Highly recommended for everyone!",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col px-4 md:px-16 lg:px-32">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 md:px-12 lg:px-24 py-20 gap-12 w-full">
        <div className="flex-1 space-y-8 text-left">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
            Voice-first Note Taking
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg">
            Speak your thoughts, store them instantly. Accessible, fast, and secure note-taking for everyone.
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg" className="rounded-2xl">
              <Link to="/auth">Start Speaking</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link to="/auth">View Notes</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* Animated wave or glow visual placeholder */}
          <div className="w-72 h-72 bg-gradient-to-tr from-violet-600/60 via-indigo-400/40 to-blue-400/30 rounded-full blur-2xl animate-pulse" />
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="max-w-5xl mx-auto py-16 px-4 md:px-12 lg:px-24 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-2xl">
                <span role="img" aria-label="mic" className="text-2xl">🎤</span>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Voice to Text</h3>
                <p className="text-muted-foreground">Speak and see your words transcribed in real time using the Web Speech API.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-2xl">
                <span role="img" aria-label="cloud" className="text-2xl">☁️</span>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Cloud Storage</h3>
                <p className="text-muted-foreground">Your notes are securely stored and synced with Supabase.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-2xl">
                <span role="img" aria-label="lock" className="text-2xl">🔒</span>
              </span>
              <div>
                <h3 className="font-semibold text-lg">Private & Accessible</h3>
                <p className="text-muted-foreground">Only you can access your notes. Designed for accessibility and privacy.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Card className="shadow-md bg-background/80 backdrop-blur-xl p-8">
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-xl mb-2">Quick Demo</h4>
                <p className="text-muted-foreground">1. Click "Start Speaking"<br/>2. Speak your note<br/>3. Save and listen anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-4 md:px-12 lg:px-24 text-center w-full">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-lg text-muted-foreground mb-4">
          SpeakNote was created to empower everyone—especially specially-abled individuals—to capture and revisit their thoughts with ease. Our mission is to make note-taking accessible, fast, and enjoyable for all.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Card className="bg-background/80 shadow-md p-6 w-64">
            <CardContent>
              <span className="text-3xl">🌍</span>
              <h3 className="font-semibold mt-2">Inclusive</h3>
              <p className="text-muted-foreground text-sm">Designed for users of all abilities.</p>
            </CardContent>
          </Card>
          <Card className="bg-background/80 shadow-md p-6 w-64">
            <CardContent>
              <span className="text-3xl">⚡</span>
              <h3 className="font-semibold mt-2">Fast</h3>
              <p className="text-muted-foreground text-sm">Instant voice-to-text and note access.</p>
            </CardContent>
          </Card>
          <Card className="bg-background/80 shadow-md p-6 w-64">
            <CardContent>
              <span className="text-3xl">🔒</span>
              <h3 className="font-semibold mt-2">Private</h3>
              <p className="text-muted-foreground text-sm">Your notes are yours alone.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-4xl mx-auto py-16 px-4 md:px-12 lg:px-24 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-background/80 shadow-md p-6 flex flex-col items-center">
              <CardContent className="flex flex-col items-center">
                <span className="text-4xl mb-2">“</span>
                <p className="text-muted-foreground text-base mb-4 text-center">{t.quote}</p>
                <span className="font-semibold text-accent-foreground">{t.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border py-8 bg-background/80 text-center text-muted-foreground text-sm mt-auto px-4 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-2">
          <div>© {new Date().getFullYear()} SpeakNote. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Credits</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 