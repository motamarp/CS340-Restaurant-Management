// databaseReset.js
import { supabase } from './supabaseConfig.js';

export const DatabaseReset = {
  async resetAllTables() {
    try {
      // Confirm with user
      if (!confirm('WARNING: This will reset ALL tables to default. Continue?')) {
        return { success: false, message: 'Operation cancelled' };
      }

      // Show loading state
      const loadingEl = document.getElementById('loading-message');
      if (loadingEl) loadingEl.textContent = 'Resetting database...';

      // Call the PostgreSQL function
      const { error } = await supabase.rpc('reset_all_tables');

      if (error) throw error;

      return { 
        success: true, 
        message: 'All tables reset successfully',
        action: () => window.location.reload() // Optional auto-refresh
      };
    } catch (error) {
      console.error('Database reset failed:', error);
      return {
        success: false,
        message: `Reset failed: ${error.message}`
      };
    }
  }
};