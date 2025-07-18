import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/index.ts'
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Router from './AppRouter/Router.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
