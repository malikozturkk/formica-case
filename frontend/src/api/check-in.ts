import { API_URL } from '@/lib/auth';
import api from '@/lib/axios';

export const checkIn = async (surname: string, pnr: number) => {
  const response = await api.post(`${API_URL}/check-in`, { surname, pnr });
  return response.data;
};
