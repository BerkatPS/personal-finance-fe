import { writable } from "svelte/store";

// Default halaman awal adalah "/"
export const currentPage = writable("/");

// Fungsi untuk mengubah halaman saat ini
export function setCurrentPage(page) {
    currentPage.set(page);
}

// Daftar endpoint yang dapat digunakan di seluruh aplikasi
export const endpoints = {
    HOME: "/",
    ANALYTICS: "/analytics",
    BALANCE: "/balance",
    BUDGETING: "/budgeting",
    LOGIN: "/login",
    PROFILE: "/profile",
    REGISTER: "/register",
    SETTINGS: "/settings",
    TRANSACTION_FORM: "/transactionForm",
    TRANSACTIONS: "/transactions",
    CHANGE_PASSWORD: "/change-password",
};
