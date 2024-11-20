<script>
    import {isAuthenticated, token} from "../stores/authStore";
    import {currentPage, endpoints} from "../stores/currPage.js"; // Import endpoints untuk navigasi

    let username = '';
    let password = '';
    let message = '';
    let isError = false;

    // Fungsi untuk melakukan login
    async function login(event) {
        event.preventDefault();
        const requestBody = {username, password};

        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                token.set(data.token);
                isAuthenticated.set(true);
                window.location.href = "/"; // Arahkan ke halaman utama setelah login berhasil
                message = data.message;
                isError = false;
            } else {
                message = data.message || "Terjadi kesalahan. Silakan coba lagi.";
                isError = true;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            message = "Gagal masuk. Silakan periksa koneksi Anda.";
            isError = true;
        }
    }

    // Fungsi untuk navigasi ke halaman register
    function goToRegister() {
        window.location.href = endpoints.REGISTER; // Arahkan ke halaman register
    }
</script>

<div class="page-wrapper">
    <div class="login-container">
        <h2>Masuk ke Akun Anda</h2>
        <p>Silakan masukkan email dan password untuk login</p>
        <form on:submit={login}>
            <div class="input-group">
                <input type="text" bind:value={username} placeholder="Username" required/>
            </div>
            <div class="input-group">
                <input type="password" bind:value={password} placeholder="Password" required/>
            </div>
            <button type="submit">Masuk</button>
        </form>
        <p>Belum Punya Akun? <a href="javascript:void(0)" on:click={goToRegister}>Daftar</a></p>
        <!-- Tampilkan pesan dari API -->
        {#if message}
            <p class="message" class:is-error={isError}>{message}</p>
        {/if}
    </div>
</div>

<style>
    /* CSS styles tetap sama */
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #e9ecef;
        padding: 1rem;
    }

    .login-container {
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

    h2 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

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

    .message {
        margin-top: 1rem;
        font-size: 1rem;
    }

    .message.is-error {
        color: red;
    }
</style>
