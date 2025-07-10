import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Auto-fill content if coming from Home page
  useEffect(() => {
    if (location.state?.content) {
      setContent(location.state.content);
    }
  }, [location.state]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your note",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully",
    });
    
    navigate("/notes");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak to add more content to your note",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your speech has been added to the note",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Create New Note</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className={isRecording ? "text-destructive" : ""}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Add Voice
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Note Title
            </label>
            <Input
              id="title"
              placeholder="Enter a title for your note..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Note Content
            </label>
            <Textarea
              id="content"
              placeholder="Type or speak your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed"
            />
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center justify-center space-x-2 text-destructive animate-pulse">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-sm font-medium">Recording in progress...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}