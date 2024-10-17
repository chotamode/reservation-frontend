import config from '../config.js';
import supabase from './supabaseClient.js';

const BASE_URL = config.backendUrl;

export async function signup(formData) {
  const response = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    if(response.ok){
      const {access_token, refresh_token} = data;

      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      }

  }catch (err) {
    throw new Error(err.message);
  }
}