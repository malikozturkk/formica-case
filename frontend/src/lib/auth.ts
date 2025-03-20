import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://formica-case.local/api";

export const getCookie = (name: string) => {
  if (typeof document === "undefined") return null; 
  const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return cookies ? cookies.split("=")[1] : null;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getCookie("refresh_token");

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    document.cookie = `access_token=${access_token}; path=/;`;
    document.cookie = `refresh_token=${newRefreshToken}; path=/;`;

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
