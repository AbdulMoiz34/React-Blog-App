import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Header } from './components/index.ts'
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Router from './AppRouter/Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
      <Toaster position='top-center' reverseOrder={false} />
      <Header />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
