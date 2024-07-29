import { useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';

function useAuth() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.session;
    setSession(currentSession);
    setUser(currentSession?.user || null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
    });

    // Correctly unsubscribe when the component unmounts
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return { session, user };
}

export default useAuth;