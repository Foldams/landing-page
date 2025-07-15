import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeSupabase } from './lib/supabase';

// Initialize Supabase
initializeSupabase()
  .then(() => console.log('Supabase initialized'))
  .catch((error) => console.error('Failed to initialize Supabase:', error));

createRoot(document.getElementById('root')!).render(<App />);
