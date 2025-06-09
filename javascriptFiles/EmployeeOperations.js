import { supabase } from './supabaseConfig.js';

export const EmployeeOperations = {
  // Get all employees sorted by ID
  async getAllEmployees() {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('employeeid', { ascending: true });  // Changed to sort by ID
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      throw error;
    }
  },

  // Get a single employee by ID
  async getEmployee(employeeId) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employeeid', employeeId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching employee ${employeeId}:`, error.message);
      throw error;
    }
  },

  // Add a new employee
  async addEmployee(employeeData) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          name: employeeData.name,
          email: employeeData.email,
          role: employeeData.role,
          hiredate: new Date().toISOString()
        }]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding employee:', error.message);
      throw error;
    }
  },

  // Update an existing employee
  async updateEmployee(employeeId, employeeData) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update({
          name: employeeData.name,
          email: employeeData.email,
          role: employeeData.role
        })
        .eq('employeeid', employeeId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating employee ${employeeId}:`, error.message);
      throw error;
    }
  },

  // Delete an employee
  async deleteEmployee(employeeId) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .delete()
        .eq('employeeid', employeeId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error deleting employee ${employeeId}:`, error.message);
      throw error;
    }
  }
};