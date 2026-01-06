// Labs API methods
import { apiClient } from './client';
import type { Lab, CreateLabInput, UpdateLabInput } from '../types';

export const labsAPI = {
  // Get all labs
  getAll: async (): Promise<Lab[]> => {
    return apiClient.get<Lab[]>('/labs');
  },

  // Create lab
  create: async (data: CreateLabInput): Promise<Lab> => {
    return apiClient.post<Lab>('/labs', data);
  },

  // Update lab
  update: async (id: string, data: UpdateLabInput): Promise<Lab> => {
    return apiClient.put<Lab>(`/labs/${id}`, data);
  },

  // Delete lab
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete(`/labs/${id}`);
  },
};
