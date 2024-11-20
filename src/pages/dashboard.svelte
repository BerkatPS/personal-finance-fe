<script>
    import { onMount } from "svelte";
    import { token } from "../stores/authStore";
    import { get } from "svelte/store";

    let balance = 0; // Saldo pengguna
    let transactions = []; // Daftar transaksi terbaru
    let isLoading = true;
    let isError = false;
    let message = '';

    // Fungsi untuk memformat angka menjadi format Rupiah
    function formatToRupiah(value) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
    }

    // Fungsi untuk mengambil data saldo
    async function fetchBalance() {
        try {
            const tokenValue = get(token);
            const response = await fetch("http://localhost:8080/balance", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                balance = data.amount; // Gunakan `amount` untuk saldo
            } else {
                throw new Error("Gagal mengambil saldo.");
            }
        } catch (error) {
            console.error("Kesalahan saat mengambil saldo:", error);
            isError = true;
            message = error.message;
        }
    }

    // Fungsi untuk mengambil daftar transaksi terbaru
    async function fetchTransactions() {
        try {
            const tokenValue = get(token);
            const response = await fetch("http://localhost:8080/transactions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();

                transactions = data.slice(0,3);
            } else {
                throw new Error("Gagal mengambil daftar transaksi.");
            }
        } catch (error) {
            console.error("Kesalahan saat mengambil transaksi:", error);
            isError = true;
            message = error.message;
        } finally {
            isLoading = false;
        }
    }

    // Panggil data saat halaman dimuat
    onMount(async () => {
        await fetchBalance();
        await fetchTransactions();
    });
</script>

<style>
    :root {
        --primary-color: #6200ee;
        --secondary-color: #3700b3;
        --background-color: #f9fafc;
        --card-background: #ffffff;
        --text-color: #333;
        --border-radius: 16px;
        --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        --gradient: linear-gradient(135deg, #6200ee, #3700b3);
    }

    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: var(--background-color);
    }

    main {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .header h1 {
        color: var(--primary-color);
        font-size: 2.5rem;
        font-weight: bold;
    }

    .header button {
        padding: 0.8rem 1.5rem;
        background-image: var(--gradient);
        color: white;
        border: none;
        border-radius: var(--border-radius);
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .header button:hover {
        transform: translateY(-2px);
        box-shadow: var(--box-shadow);
    }

    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .card {
        background-color: var(--card-background);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius);
        padding: 2rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    .card-icon {
        font-size: 3rem;
        color: var(--primary-color);
    }

    .balance-amount {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .transactions-card {
        text-align: left;
        width: 100%;
    }

    .transactions-card h2 {
        margin-bottom: 1rem;
    }

    .transactions-card table {
        width: 100%;
        border-collapse: collapse;
    }

    .transactions-card th, .transactions-card td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }

    .transactions-card th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    .quick-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .quick-action {
        flex: 1;
        padding: 1.5rem;
        text-align: center;
        background-image: var(--gradient);
        color: white;
        border-radius: var(--border-radius);
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .quick-action:hover {
        transform: scale(1.05);
        box-shadow: var(--box-shadow);
    }
</style>

<main>
    <div class="header">
        <h1>Dashboard</h1>
        <button on:click={() => window.location.href = "/transactionForm"}>
            + Tambah Transaksi
        </button>
    </div>

    <div class="dashboard-grid">
        <!-- Kartu Saldo -->
        <div class="card">
            <div class="card-icon">💰</div>
            <h2>Saldo Anda</h2>
            <p class="balance-amount">{formatToRupiah(balance)}</p>
        </div>

        <!-- Kartu Transaksi Terbaru -->
        <div class="card transactions-card">
            <h2>Transaksi Terbaru</h2>
            {#if isLoading}
                <p>Memuat transaksi...</p>
            {:else if isError}
                <p>{message}</p>
            {:else if transactions.length === 0}
                <p>Tidak ada transaksi terbaru.</p>
            {:else}
                <table>
                    <thead>
                    <tr>
                        <th>Deskripsi</th>
                        <th>Jumlah</th>
                        <th>Tanggal</th>
                        <th>Tipe</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each transactions as transaction}
                        <tr>
                            <td>{transaction.description}</td>
                            <td>{formatToRupiah(transaction.amount)}</td>
                            <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                            <td>{transaction.type === 1 ? "Pemasukan" : "Pengeluaran"}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    </div>

    <div class="quick-actions">
        <div class="quick-action" on:click={() => window.location.href = "/analytics"}>📊 Lihat Statistik</div>
        <div class="quick-action" on:click={() => window.location.href = "/profile"}>⚙️ Pengaturan</div>
    </div>
</main>
