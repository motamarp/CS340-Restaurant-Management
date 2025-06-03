import { supabase } from './supabaseConfig.js';

export const DatabaseReset = {
  async resetAllTables() {
    try {
      const { error } = await supabase.rpc('reset_restaurant_database');
      
      if (error) throw error;
      
      return {
        success: true,
        message: 'Database reset successfully',
        action: () => window.location.reload()
      };
    } catch (error) {
      return {
        success: false,
        message: `Reset failed: ${error.message}`
      };
    }
  }
};