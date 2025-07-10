import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">Welcome to SpeakNote</h1>
        <p className="text-lg text-muted-foreground">
          SpeakNote is an accessible web app that lets you take notes by speaking. Transcribe your thoughts, save them securely, and listen to them anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/auth">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 