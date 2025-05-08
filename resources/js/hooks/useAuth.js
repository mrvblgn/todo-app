import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import { login as loginService, register as registerService, logout as logoutService } from "@/services/authService";

export default function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Uygulama başlarken token varsa axios'a ekle
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = useCallback(async (credentials) => {
    const response = await loginService(credentials);
    const token = response.data?.token || response.data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }
    return response;
  }, []);

  const register = useCallback(async (data) => {
    const response = await registerService(data);
    const token = response.data?.token || response.data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }
    return response;
  }, []);

  const logout = useCallback(async () => {
    await logoutService();
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return { token, user, login, register, logout };
}
