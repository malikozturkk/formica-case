import { API_URL } from '@/lib/auth';
import api from '@/lib/axios';

export const login = async (email: string, password: string) => {
  const response = await api.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};
