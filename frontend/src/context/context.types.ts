export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
  iat?: number;
  exp?: number;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}