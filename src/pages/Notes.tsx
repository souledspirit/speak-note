import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Play, Plus, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for notes
const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discussed project timeline and deliverables. Need to follow up with team by Friday.",
    createdAt: "2024-01-15",
    excerpt: "Discussed project timeline and deliverables..."
  },
  {
    id: 2,
    title: "Shopping List",
    content: "Milk, bread, eggs, apples, chicken, rice, pasta, tomatoes",
    createdAt: "2024-01-14",
    excerpt: "Milk, bread, eggs, apples..."
  },
  {
    id: 3,
    title: "Book Ideas",
    content: "Story about time travel, romance novel set in medieval times, sci-fi adventure",
    createdAt: "2024-01-13",
    excerpt: "Story about time travel, romance novel..."
  }
];

export default function Notes() {
  const [notes, setNotes] = useState(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been removed successfully",
    });
  };

  const handlePlay = (note: any) => {
    toast({
      title: "Playing note",
      description: `Playing "${note.title}"`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">My Notes</h1>
        
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-soft transition-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{note.createdAt}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.excerpt}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlay(note)}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link to={`/edit/${note.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No notes found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search terms" : "Start creating your first voice note"}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link to="/">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Note
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <Button
        variant="floating"
        size="icon-lg"
        asChild
        className="animate-scale-in"
      >
        <Link to="/">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}