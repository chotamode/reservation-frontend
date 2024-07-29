import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Psychologist from '../components/Psychologist';
import supabase from "../supabaseClient.js";
import { Link } from 'react-router-dom';

function ProfilePage({ user }) {
  const [psychologists, setPsychologists] = useState([]);

useEffect(() => {
  const fetchPsychologists = async () => {
    try {
      let { data: psychologistsData, error } = await supabase
        .from('psychologists')
        .select(`
          id,
          experience,
          system_user:system_users (
            name,
            surname,
            email,
            patronymic
          )
        `);
      if (error) throw error;
      console.log(psychologistsData); // Check if data is fetched correctly
      setPsychologists(psychologistsData);
    } catch (error) {
      console.error("Error fetching psychologists:", error.message);
    }
  };

  fetchPsychologists();
}, []);

// Ensure the data structure matches what Psychologist component expects
console.log(psychologists);

  return (
      <div className="container mx-auto p-4">
          {user && (
              <div className="mb-8">
                  <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
                  <p>Email: {user.email}</p>
              </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Available Psychologists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {psychologists.map((psychologist) => (
                  <Link to={`/psychologist/${psychologist.id}`} key={psychologist.id} className="no-underline">
                      <Psychologist psychologist={psychologist}/>
                  </Link>
              ))}
          </div>
      </div>
  );
}

ProfilePage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default ProfilePage;