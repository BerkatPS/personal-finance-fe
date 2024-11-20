<script>
    import { onMount } from "svelte";
    import { token } from "../stores/authStore";
    import { get } from "svelte/store";

    let transactionAmount = '';
    let transactionType = '1'; // 1 untuk income, 0 untuk expense
    let transactionDescription = '';
    let message = '';
    let isError = false;
    let balance = 0; // Variabel untuk menyimpan saldo terbaru

    // Fungsi untuk memformat angka menjadi format Rupiah
    function formatToRupiah(value) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
    }

    // Fungsi untuk mengambil saldo terbaru dari server
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
                console.log("Saldo terbaru dari server:", data); // Log respons saldo
                balance = data.amount; // Update saldo dengan properti `amount`
            } else if (response.status === 401) {
                console.error("Token tidak valid atau telah kadaluarsa.");
                window.location.href = "/login"; // Redirect ke halaman login
            } else {
                console.error(`Gagal mengambil saldo: ${response.status}`);
                message = "Gagal mengambil saldo. Silakan coba lagi.";
                isError = true;
            }
        } catch (error) {
            console.error("Kesalahan saat mengambil saldo:", error);
            message = "Kesalahan jaringan. Periksa koneksi Anda.";
            isError = true;
        }
    }

    // Panggil fetchBalance saat komponen di-mount
    onMount(fetchBalance);

    // Fungsi untuk menambahkan transaksi baru
    async function addTransaction(event) {
        event.preventDefault();

        // Validasi jumlah transaksi
        if (!transactionAmount || isNaN(parseFloat(transactionAmount.replace(/[Rp,.]/g, '')))) {
            isError = true;
            message = "Jumlah transaksi tidak valid.";
            return;
        }

        const parsedAmount = parseFloat(transactionAmount.replace(/[Rp,.]/g, ''));

        const requestBody = {
            amount: parsedAmount,
            type: parseInt(transactionType),
            description: transactionDescription.trim(),
        };

        console.log("Request Body:", JSON.stringify(requestBody)); // Log data yang dikirim ke server

        try {
            const tokenValue = get(token);


            const response = await fetch("http://localhost:8080/transactions/create", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            console.log("Status Response:", response.status); // Log status respons
            if (response.ok) {
                const data = await response.json();
                console.log("Respons dari server:", data); // Log respons dari server
                isError = false;
                message = "Transaksi berhasil ditambahkan!";
                transactionAmount = '';
                transactionType = '1';
                transactionDescription = '';

                // Update saldo setelah transaksi berhasil
                await fetchBalance();
            } else if (response.status === 401) {
                console.error("Token tidak valid atau telah kadaluarsa.");
                alert("Token Anda telah kadaluarsa. Silakan login ulang.");
                window.location.href = "/login";
            } else {
                const data = await response.json();
                console.log("Error Data:", data); // Log error dari server

                if (data.error === "insufficient balance") {
                    isError = true;
                    message = "Saldo tidak mencukupi atau tidak boleh 0";
                } else{
                    isError = true;
                    message = data.message || "Terjadi kesalahan. Silakan coba lagi.";
                }
            }
        } catch (error) {
            console.error("Kesalahan fetch:", error);
            isError = true;
            message = "Gagal menambahkan transaksi. Periksa koneksi Anda.";
        }
    }
</script>

<div class="transaction-form">
    <h2>Transaksi Baru</h2>
    <p>Saldo: {formatToRupiah(balance)}</p> <!-- Tampilkan saldo dengan format Rupiah -->
    <form on:submit={addTransaction}>
        <label>
            Jumlah
            <input type="text" bind:value={transactionAmount} placeholder="Rp0" required />
        </label>
        <label>
            Tipe
            <select bind:value={transactionType}>
                <option value="1">Pemasukan</option>
                <option value="0">Pengeluaran</option>
            </select>
        </label>
        <label>
            Deskripsi
            <input type="text" bind:value={transactionDescription} placeholder="Deskripsi" required />
        </label>
        <button type="submit">Tambah Transaksi</button>
    </form>
    <!-- Tampilkan pesan dari API -->
    {#if message}
        <p class="message {isError ? 'isError' : 'isSuccess'}">{message}</p>
    {/if}
</div>


<style>
    .transaction-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #333;
        margin-bottom: 1rem;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-size: 0.9rem;
        color: #666;
    }

    input, select {
        width: 100%;
        padding: 0.8rem;
        margin-top: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    input:focus, select:focus {
        outline: none;
        border-color: #6200ee;
        box-shadow: 0 0 5px rgba(98, 0, 238, 0.2);
    }

    button {
        padding: 0.8rem;
        background-color: #6200ee;
        color: white;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
    }

    button:hover {
        background-color: #3700b3;
    }

    button:active {
        transform: scale(0.98);
    }

    .message {
        margin-top: 1rem;
        font-size: 1rem;
        text-align: center;
    }

    .message.isError {
        color: red;
    }

    .message:not(.isError) {
        color: green;
    }
</style>
