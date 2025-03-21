import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://formica-case.local/api";

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
    setCookie("access_token", access_token, 1);
    setCookie("refresh_token", newRefreshToken, 30);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
