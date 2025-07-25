import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { Header, Loader, OfflineAlert } from './components';
import Router from './AppRouter/Router';
import AuthContext from './context/AuthContext/AuthContext';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, getDoc, doc, db } from './config/firebase';
import type { User } from "./context/AuthContext/AuthContext";

function App() {

  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        try {
          const docSnap = await getDoc(doc(db, "users", currentUser.uid));
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              email: userData.email || null,
              userName: userData.userName || null,
              uid: currentUser.uid,
              userImage: userData.userImage
            });

            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (_err) {
          toast.error("Failed to fetch user data.");
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>;
  }

  return (
    <>
      <AuthContext value={authContextValue}>
        <Header />
        <Router />
      </AuthContext>
      <OfflineAlert />
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
