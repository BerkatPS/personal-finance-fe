// src/lib/api.js
import { logout } from "../stores/authStore";

// Fungsi untuk melakukan request dengan autentikasi
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };

    const response = await fetch(url, { ...options, headers });

    // Cek apakah status respons menunjukkan token kedaluwarsa
    if (response.status === 401) {
        logout(); // Logout otomatis
        window.location.href = "/login"; // Redirect ke halaman login
    }

    return response;
}
