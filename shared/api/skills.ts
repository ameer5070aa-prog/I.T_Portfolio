// Skills API methods
import { apiClient } from './client';
import type { Skill, SkillsByCategory, CreateSkillInput, UpdateSkillInput } from '../types';

export const skillsAPI = {
  // Get all skills
  getAll: async (): Promise<Skill[]> => {
    return apiClient.get<Skill[]>('/skills');
  },

  // Get skills grouped by category
  getByCategory: async (): Promise<SkillsByCategory> => {
    return apiClient.get<SkillsByCategory>('/skills/by-category');
  },

  // Create skill
  create: async (data: CreateSkillInput): Promise<Skill> => {
    return apiClient.post<Skill>('/skills', data);
  },

  // Update skill
  update: async (id: string, data: UpdateSkillInput): Promise<Skill> => {
    return apiClient.put<Skill>(`/skills/${id}`, data);
  },

  // Delete skill
  delete: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete(`/skills/${id}`);
  },
};
