import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DosyaProvider } from './providers/dosya-provider.tsx';
import { DosyaPreferences } from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DosyaProvider>
      <App />
    </DosyaProvider>
  </StrictMode>,
);
