import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Save, Play, Square, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate transcription for demo
    setTimeout(() => {
      setTranscription("Hi abel.");
    }, 2000);
    
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording stopped",
      description: "Your speech has been transcribed successfully",
    });
  };

  const handleSave = () => {
    if (transcription.trim()) {
      // In a real app, this would save to a database
      navigate("/create", { state: { content: transcription } });
    } else {
      toast({
        title: "No content to save",
        description: "Please record some speech first",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground tracking-tight">
            SpeakNote
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Voice-powered notes for everyone. Transform your thoughts into text with the power of speech.
          </p>
        </div>

        {/* Recording Control */}
        <div className="flex flex-col items-center space-y-6">
          <Button
            variant="hero"
            size="icon-lg"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className="animate-scale-in"
          >
            {isRecording ? (
              <Square className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isRecording ? "Recording... Click to stop" : "Click to start recording"}
            </p>
            {isRecording && (
              <div className="flex items-center justify-center space-x-2 text-destructive">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transcription Area */}
      <Card className="animate-fade-in">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Speech</h2>
              {transcription && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Note
                </Button>
              )}
            </div>
            
            <Textarea
              placeholder="Your transcribed speech will appear here..."
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-[200px] text-base leading-relaxed resize-none"
            />
            
            {transcription && (
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Play Back
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Features */}
      <div className="grid md:grid-cols-3 gap-6 py-8">
        <Card className="text-center p-6 hover:shadow-soft transition-shadow">
          <CardContent className="space-y-4 p-0">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
              <Mic className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">Voice Recording</h3>
            <p className="text-sm text-muted-foreground">
              High-quality speech-to-text conversion in real-time
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-soft transition-shadow">
          <CardContent className="space-y-4 p-0">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">Smart Notes</h3>
            <p className="text-sm text-muted-foreground">
              Organize and search through your voice notes effortlessly
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-soft transition-shadow">
          <CardContent className="space-y-4 p-0">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
              <Play className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">Playback</h3>
            <p className="text-sm text-muted-foreground">
              Listen to your original recordings anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}