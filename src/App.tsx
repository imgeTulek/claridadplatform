
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import DashboardPage from "./pages/DashboardPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ImportPage from "./pages/ImportPage";
import QueriesPage from "./pages/QueriesPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

// Auth state (basit bir örnek, gerçek uygulamada daha gelişmiş bir durumda olacaktır)
const isAuthenticated = () => {
  // Gerçek uygulamada bir token kontrolü veya başka bir yöntem kullanılabilir
  // Şu an geliştirme için her zaman true dönüyoruz
  return true;
};

// Korumalı yönlendirici bileşeni
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/giris" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/giris" element={<LoginPage />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/connections" element={
                <ProtectedRoute>
                  <ConnectionsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/import" element={
                <ProtectedRoute>
                  <ImportPage />
                </ProtectedRoute>
              } />
              
              <Route path="/queries" element={
                <ProtectedRoute>
                  <QueriesPage />
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              
              {/* More routes can be added here */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
