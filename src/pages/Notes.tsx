import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Play, Plus, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/AuthContext";

export default function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setNotes(data || []);
        }
        setLoading(false);
      });
  }, [user]);

  const filteredNotes = notes.filter(note =>
    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // TODO: Add create, edit, delete, and playback logic with Supabase

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

      {/* Loading/Error/Empty States */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading notes...</div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">{error}</div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-soft transition-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{note.created_at?.slice(0, 10)}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content?.slice(0, 80) || "No content"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast({ title: "Playing note", description: `Playing \"${note.title}\"` })}
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
                    // TODO: Add delete logic
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
            {/* TODO: Add create note button */}
          </div>
        </div>
      )}

      {/* Floating Add Button (TODO: Add create logic) */}
      {/* <Button
        variant="floating"
        size="icon-lg"
        asChild
        className="animate-scale-in"
      >
        <Link to="/create">
          <Plus className="h-6 w-6" />
        </Link>
      </Button> */}
    </div>
  );
}