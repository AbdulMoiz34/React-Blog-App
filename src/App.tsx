import { Toaster } from 'react-hot-toast';
import './App.css'
import { Header } from './components';
import Router from './AppRouter/Router';
import AuthContext from './context/AuthContext/AuthContext';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const [user, setUser] = useState<null | object>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading
  };
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  });


  return (
    <>
      <AuthContext value={authContextValue}>
        <Header />
        <Router />
      </AuthContext>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
