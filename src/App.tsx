import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Index';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { initializeSupabase } from './lib/supabase';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  // Initialize Supabase when the app loads
  useEffect(() => {
    initializeSupabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;