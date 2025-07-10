import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X, Mic, MicOff, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock note data (in a real app, this would come from a database)
const mockNote = {
  id: 1,
  title: "Meeting Notes",
  content: "Discussed project timeline and deliverables. Need to follow up with team by Friday. The client wants weekly updates and prefers email communication.",
  createdAt: "2024-01-15"
};

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch note by ID
    setTitle(mockNote.title);
    setContent(mockNote.content);
  }, [id]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your note",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Note updated",
      description: "Your changes have been saved successfully",
    });
    
    navigate("/notes");
  };

  const handleDelete = () => {
    toast({
      title: "Note deleted",
      description: "The note has been removed permanently",
    });
    
    navigate("/notes");
  };

  const handleCancel = () => {
    navigate("/notes");
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
            <span>Edit Note</span>
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
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
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
              Save Changes
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