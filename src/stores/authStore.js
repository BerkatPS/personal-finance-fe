// src/stores/authStore.js
import {get, writable} from "svelte/store";

export const isAuthenticated = writable(false); // Menyimpan status login
export const token = writable(localStorage.getItem("authToken") || null);  // Gunakan null jika token tidak ada

console.log("Token:", get(token));
console.log("Is Authenticated:", isAuthenticated);
if (localStorage.getItem("authToken")) {
    isAuthenticated.set(true);
} else {
    isAuthenticated.set(false);
}

// Fungsi untuk logout
export function logout() {
    localStorage.removeItem('authToken');  // Menghapus token dari localStorage
    isAuthenticated.set(false);  // Set status autentikasi ke false
    window.location.href = '/login';  // Redirect pengguna ke halaman login
}

