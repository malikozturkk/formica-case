import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://formica-case.local/api";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", newRefreshToken);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
