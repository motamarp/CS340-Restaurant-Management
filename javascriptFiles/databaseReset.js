// databaseReset.js
import { supabase } from './supabaseConfig.js';

export const DatabaseReset = {
  async function resetDatabase() {
  const confirmation = confirm("WARNING: This will reset ALL data. Continue?");
  if (!confirmation) return;
  
  try {
    const { error } = await supabase.rpc('reset_restaurant_database');
    if (error) throw error;
    alert('Database reset successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Reset failed:', error);
    alert(`Reset failed: ${error.message}`);
  }
}
};