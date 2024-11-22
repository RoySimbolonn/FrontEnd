import apiClient from "@/plugins/axios";
import { useAuthStore } from "@/store/authStore";

export const login = async (username, password) => {
    try {
        const response = await apiClient.post("/auth/login", {
            username,
            password,
        });

        const token = response.data.data.token;

        // Ekstrak peran dari token (sesuaikan dengan backend Anda)
        const role = token ? "ADMIN" : ""; // Ganti dengan logika sesuai kebutuhan

        const authStore = useAuthStore();
        authStore.setToken(token);
        authStore.setRole(role);

        return { token, role };
    } catch (error) {
        console.error("Kesalahan saat login:", error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await apiClient.post("/auth/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};