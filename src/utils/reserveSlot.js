// src/utils/reserveSlot.js
import config from '../config.js';

const BASE_URL = config.backendUrl;

async function reserveSlot(slotId, customerId) {
  const response = await fetch(`${BASE_URL}/slot/reserve-slot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slotId, customerId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export default reserveSlot;