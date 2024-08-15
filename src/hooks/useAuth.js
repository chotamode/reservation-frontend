import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';

function useAuth() {
  const [session, setSession] = useState(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    return savedSession ? JSON.parse(savedSession)?.user : null;
  });
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('supabaseSession', JSON.stringify(session));
        setSession(session);
        setUser(session.user);
        checkIfPsychologist(session.user.id);
        checkIfAdmin(session.user.id);
      }
    };

    const checkIfPsychologist = async (userId) => {
      const { data } = await supabase
        .from('psychologists')
        .select('id')
        .eq('id', userId)
        .single();
      if (data) {
        setIsPsychologist(true);
      }
    };

    const checkIfAdmin = async (userId) => {
      const { data } = await supabase
        .from('admin')
        .select('id')
        .eq('id', userId)
        .single();
      if (data) {
        setIsAdmin(true);
      }
    };

    getSession().then(r => r);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession) {
        localStorage.setItem('supabaseSession', JSON.stringify(newSession));
        checkIfPsychologist(newSession.user.id).then(r => r);
        checkIfAdmin(newSession.user.id).then(r => r);
      } else {
        localStorage.removeItem('supabaseSession');
        setIsPsychologist(false);
        setIsAdmin(false);
      }
      setSession(newSession);
      setUser(newSession?.user || null);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      localStorage.removeItem('supabaseSession');
      setSession(null);
      setUser(null);
      setIsPsychologist(false);
      setIsAdmin(false);
    }
  };

  return { session, user, isPsychologist, isAdmin, logout };
}

export default useAuth;