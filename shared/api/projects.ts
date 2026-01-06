// Projects API methods
import { apiClient } from './client';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types';

export const projectsAPI = {
  // Get all projects
  getAll: async (status?: 'draft' | 'published'): Promise<Project[]> => {
    const params = status ? { status } : undefined;
    return apiClient.get<Project[]>('/projects', params);
  },

  // Get single project
  getById: async (id: string): Promise<Project> => {
    return apiClient.get<Project>(`/projects/${id}`);
  },

  // Create project
  create: async (data: CreateProjectInput): Promise<Project> => {
    return apiClient.post<Project>('/projects', data);
  },

  // Update project
  update: async (id: string, data: UpdateProjectInput): Promise<Project> => {
    return apiClient.put<Project>(`/projects/${id}`, data);
  },

  // Delete project
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete(`/projects/${id}`);
  },

  // Reorder projects
  reorder: async (projectIds: string[]): Promise<{ message: string }> => {
    return apiClient.patch('/projects/reorder', { projectIds });
  },
};
