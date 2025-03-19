import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://formica-case.local/api";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    const cookieStoreNew = await cookies();
    cookieStoreNew.set("access_token", access_token);
    cookieStoreNew.set("refresh_token", newRefreshToken);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
