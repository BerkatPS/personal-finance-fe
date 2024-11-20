<script>
    import {get, writable} from 'svelte/store';
    import {onMount} from 'svelte';
    import {isAuthenticated, token} from '../stores/authStore'; // Mengimpor token dan status autentikasi dari authStore.js
    import {currentPage, endpoints} from '../stores/currPage'; // Jika Anda menggunakan store untuk halaman saat ini

    // Store untuk menyimpan balance
    let balance = writable(0);

    // Variabel sementara untuk menyimpan input balance
    let newBalance = '';

    // Fungsi untuk mengupdate balance melalui API
    const updateBalance = async () => {
        // Gunakan nilai reaktif $isAuthenticated dan $token
        if (!$isAuthenticated) {
            currentPage.set(endpoints.LOGIN);
            window.location.href = endpoints.LOGIN;
            return;
        }

        if (newBalance && !isNaN(newBalance)) {
            try {
                // Gunakan nilai reaktif $token secara langsung
                const authToken = get(token);

                // Kirim request ke API dengan menggunakan token
                const response = await fetch(`http://localhost:8080/balance/update`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: parseFloat(newBalance)
                    })
                });

                if (!response.ok) {
                    throw new Error('Gagal memperbarui balance');
                }

                // Jika berhasil, update store balance dan tampilkan notifikasi
                balance.set(parseFloat(newBalance));
                alert('Balance berhasil diperbarui!');
                newBalance = ''; // Reset form setelah disimpan
            } catch (error) {
                console.error(error);
                alert(error.message || 'Terjadi kesalahan saat memperbarui balance');
            }
        } else {
            alert('Masukkan nilai balance yang valid.');
        }
    };

    // Fungsi untuk mendapatkan balance dari API
    const getBalance = async () => {
        if (!$isAuthenticated) {
            currentPage.set(endpoints.LOGIN); // Set currentPage jika ada store untuk halaman saat ini
            window.location.href = endpoints.LOGIN;
            return;
        }

        try {
            // Gunakan nilai reaktif $token secara langsung
            const response = await fetch(`http://localhost:8080/balance`, {
                headers: {
                    'Authorization': `Bearer ${$token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (!response.ok) {
                throw new Error('Gagal mendapatkan balance');
            }

            const data = await response.json();
            balance.set(data.amount);
        } catch (error) {
            console.error(error);
            alert(error.message || 'Terjadi kesalahan saat mendapatkan balance');
        }
    };

    onMount(() => {
        getBalance();
    });
</script>


<style>
    main {
        font-family: var(--font-family);
        color: var(--text-color);
        background-color: var(--background-color);
        padding: 2rem;
        max-width: 400px;
        margin: 0 auto;
    }

    h1 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 2rem;
    }

    .balance-card {
        background-color: var(--card-background);
        box-shadow: var(--box-shadow);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .balance-card:hover {
        transform: translateY(-4px);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    }

    .balance-display {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        color: var(--primary-color);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
        text-align: left;
    }

    label {
        font-weight: 600;
        color: var(--text-color);
    }

    input[type="number"] {
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        transition: border-color 0.3s ease;
    }

    input[type="number"]:focus {
        outline: none;
        border-color: #6200ee;
    }

    .save-button {
        background: var(--button-background);
        color: var(--button-text-color);
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 12px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 1.5rem;
        transition: all 0.3s ease;
    }

    .save-button:hover {
        background: #5300e8;
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }
</style>

<main>
    <h1>Perbarui Saldo</h1>

    <!-- Kartu Balance -->
    <div class="balance-card">
        <!-- Menampilkan Balance Terbaru -->
        <div class="balance-display">
            Saldo: Rp{($balance).toLocaleString()}
        </div>

        <!-- Form Input Balance -->
        <div class="input-group">
            <label for="newBalance">Masukkan Saldo Baru</label>
            <input id="newBalance" type="number" placeholder="Contoh: 1000000" bind:value={newBalance} />
        </div>

        <!-- Tombol Simpan -->
        <button class="save-button" on:click={updateBalance}>Simpan</button>
    </div>
</main>
