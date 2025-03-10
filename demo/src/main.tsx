import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DosyaProvider } from '@fhorray/dosya';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DosyaProvider>
      <App />
    </DosyaProvider>
  </StrictMode>,
);
