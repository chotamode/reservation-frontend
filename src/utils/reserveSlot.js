import supabase from '../supabaseClient.js';
import {sendEmail} from "./api.js";

async function reserveSlot(slotId, customerId) {
  // Check if the slot is already reserved
  const { data: slot, error: slotError } = await supabase
    .from('slots')
    .select('reserved_by')
    .eq('id', slotId)
    .single();

  if (slotError) {
    throw new Error(slotError.message);
  }

  if (slot.reserved_by) {
    return { error: 'This slot is already reserved.' };
  }

  // Reserve the slot
  const { error: reserveError } = await supabase
    .from('slots')
    .update({ reserved_by: customerId })
    .eq('id', slotId);

  if (reserveError) {
    throw new Error(reserveError.message);
  }

  await sendEmail(slotId); // Send an email to the customer

  return { success: true };
}
export default reserveSlot;