import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH } from './constants/Constants.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={BASE_PATH}>
    <App />
  </BrowserRouter>,
);
