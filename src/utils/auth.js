// src/utils/auth.js
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
  const { error, session } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return session;
}