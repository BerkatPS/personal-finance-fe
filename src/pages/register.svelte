<script>
    let username = '';
    let password = '';
    let message = ''; // Variabel untuk menampilkan pesan dari API
    let isError = false; // Variabel untuk menentukan apakah pesan adalah error atau sukses

    // Fungsi untuk melakukan registrasi
    async function register(event) {
        event.preventDefault(); // Mencegah form dari submit default

        // Buat request body
        const requestBody = {
            username,
            password
        };

        try {
            // Lakukan API call dengan fetch
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            // Parse response JSON
            const data = await response.json();

            if (response.ok) {
                // Jika registrasi berhasil
                isError = false;
                message = data.message;
                // Reset form input
                username = '';
                password = '';
            } else {
                // Jika ada error dari API
                isError = true;
                if (data.error === "Username Sudah Terdaftar") {
                    // Tampilkan pesan error khusus jika username sudah ada
                    message = "Username sudah terdaftar. Silakan gunakan username lain.";
                } else {
                    // Tampilkan pesan error umum jika terjadi kesalahan lainnya
                    message = data.error || "Terjadi kesalahan. Silakan coba lagi.";
                }
            }
        } catch (error) {
            // Tangani error yang terjadi saat memanggil API
            console.error("Fetch error:", error);
            isError = true;
            message = "Gagal membuat akun. Silakan periksa koneksi Anda.";
        }
    }
</script>

<div class="page-wrapper">
    <div class="register-container">
        <h2>Daftar Akun Baru</h2>
        <p>Lengkapi form di bawah ini untuk membuat akun</p>
        <form on:submit={register}>
            <div class="input-group">
                <input type="text" bind:value={username} placeholder="Username" required/>
            </div>
            <div class="input-group">
                <input type="password" bind:value={password} placeholder="Password" required/>
            </div>
            <button type="submit">Daftar</button>
            <p>Sudah Punya Akun? <a href="javascript:void(0)" on:click={() => window.location.href = '/login'}>Masuk</a></p>
        </form>
        <!-- Tampilkan pesan dari API -->
        {#if message}
            <p class="message" class:isError={isError}>{message}</p>
        {/if}
    </div>
</div>

<style>
    /* Page wrapper to center the card */
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #e9ecef;
        padding: 1rem;
    }

    /* Container styling */
    .register-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
    }

    /* Heading styling */
    h2 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

    /* Form and input styling */
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .input-group {
        position: relative;
    }

    input {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        transition: border-color 0.3s ease;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: #6200ee;
        box-shadow: 0 0 5px rgba(98, 0, 238, 0.2);
    }

    /* Button styling */
    button {
        padding: 0.8rem;
        border: none;
        border-radius: 8px;
        background-color: #6200ee;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
    }

    button:hover {
        background-color: #3700b3;
    }

    button:active {
        transform: scale(0.98);
    }

    /* Styling untuk pesan */
    .message {
        margin-top: 1rem;
        font-size: 1rem;
    }

    /* Warna pesan dinamis */
    .message.isError {
        color: red;
    }

    .message:not(.isError) {
        color: green;
    }
</style>
