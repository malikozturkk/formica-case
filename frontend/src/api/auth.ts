import api from '@/lib/axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://formica-case.local/api';

export const login = async (email: string, password: string) => {
  const response = await api.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};
