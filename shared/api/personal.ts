// Personal Info API methods
import { apiClient } from './client';
import type { PersonalInfo, UpdatePersonalInfoInput } from '../types';

export const personalAPI = {
  // Get personal info
  get: async (): Promise<PersonalInfo> => {
    return apiClient.get<PersonalInfo>('/personal');
  },

  // Update personal info
  update: async (data: UpdatePersonalInfoInput): Promise<PersonalInfo> => {
    return apiClient.put<PersonalInfo>('/personal', data);
  },
};
