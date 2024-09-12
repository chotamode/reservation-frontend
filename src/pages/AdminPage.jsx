import React from 'react';
import useAuth from '../hooks/useAuth';
import useFetchPsychologists from '../hooks/psychologist/useFetchPsychologists.js';
import useToggleActivation from '../hooks/useToggleActivation';
import PsychologistsTable from '../components/PsychologistsTable';

function AdminPage() {
  const { user } = useAuth();
  const { psychologists, loading, error, setPsychologists } = useFetchPsychologists();
  const { toggleActivation } = useToggleActivation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <PsychologistsTable
        psychologists={psychologists}
        toggleActivation={(id, currentStatus) => toggleActivation(id, currentStatus, setPsychologists)}
      />
    </div>
  );
}

export default AdminPage;