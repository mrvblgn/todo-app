import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser, logout as logoutAction } from "@/store/slices/authSlice";
import { login as loginService, register as registerService, logout as logoutService } from "@/services/authService";

export default function useAuth() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    const login = useCallback(async (credentials) => {
        try {
            const response = await loginService(credentials);
            const token = response.data?.token || response.data?.data?.token;
            if (token) {
                dispatch(setToken(token));
                dispatch(setUser(response.data?.user));
            }
            return response;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    const register = useCallback(async (data) => {
        try {
            const response = await registerService(data);
            const token = response.data?.token || response.data?.data?.token;
            if (token) {
                dispatch(setToken(token));
                dispatch(setUser(response.data?.user));
            }
            return response;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    const logout = useCallback(async () => {
        try {
            await logoutService();
            dispatch(logoutAction());
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    return { token, user, login, register, logout };
}
