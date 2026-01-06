// Contact API methods
import { apiClient } from './client';
import type { ContactSubmission, CreateContactInput } from '../types';

export const contactAPI = {
  // Get all contact submissions (admin only)
  getAll: async (): Promise<ContactSubmission[]> => {
    return apiClient.get<ContactSubmission[]>('/contact');
  },

  // Submit contact form
  submit: async (data: CreateContactInput): Promise<ContactSubmission> => {
    return apiClient.post<ContactSubmission>('/contact', data);
  },

  // Update submission status
  updateStatus: async (
    id: string,
    status: 'new' | 'read' | 'replied' | 'archived'
  ): Promise<ContactSubmission> => {
    return apiClient.patch<ContactSubmission>(`/contact/${id}/status`, { status });
  },

  // Delete submission
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete(`/contact/${id}`);
  },
};
