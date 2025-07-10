import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a loading spinner
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
} 