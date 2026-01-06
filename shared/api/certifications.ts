// Certifications API methods
import { apiClient } from './client';
import type { Certification, CreateCertificationInput, UpdateCertificationInput } from '../types';

export const certificationsAPI = {
  // Get all certifications
  getAll: async (): Promise<Certification[]> => {
    return apiClient.get<Certification[]>('/certifications');
  },

  // Get single certification
  getById: async (id: string): Promise<Certification> => {
    return apiClient.get<Certification>(`/certifications/${id}`);
  },

  // Create certification
  create: async (data: CreateCertificationInput): Promise<Certification> => {
    return apiClient.post<Certification>('/certifications', data);
  },

  // Update certification
  update: async (id: string, data: UpdateCertificationInput): Promise<Certification> => {
    return apiClient.put<Certification>(`/certifications/${id}`, data);
  },

  // Delete certification
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete(`/certifications/${id}`);
  },
};
