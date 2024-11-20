<script>
    import { writable } from 'svelte/store';
    import {onMount} from "svelte";
    import {endpoints, currentPage} from "../stores/currPage.js";


    // Contoh data profil
    let profile = writable({
        name: 'Nama Pengguna',
        email: 'user@example.com',
        phone: '081234567890',
        address: 'Jl. Contoh Alamat, No. 123, Kota'
    });

    // Fungsi untuk mengupdate informasi profil (dummy function)
    const updateProfile = () => {
        alert('Profil berhasil diperbarui!');
    };

    function goToChangePassword() {
        window.location.href = '/change-password';
    }

    function goToBalances() {
        window.location.href = '/balance';
    }
</script>

<style>
    main {
        font-family: var(--font-family);
        color: var(--text-color);
        background-color: var(--background-color);
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
    }

    h1 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 2rem;
    }

    .profile-card {
        background-color: var(--card-background);
        box-shadow: var(--box-shadow);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .profile-card:hover {
        transform: translateY(-4px);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    }

    .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #ddd;
        display: inline-block;
        margin-bottom: 1.5rem;
        background-image: url('https://cdn-icons-png.flaticon.com/512/149/149071.png');
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .profile-image:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    label {
        font-weight: 600;
        color: var(--text-color);
        display: block;
        margin-bottom: 0.3rem;
    }

    input[type="text"], input[type="email"], input[type="tel"] {
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        transition: border-color 0.3s ease;
    }

    input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus {
        outline: none;
        border-color: #6200ee;
    }

    .update-button {
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

    .update-button:hover {
        background: #5300e8;
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }
</style>

<main>
    <h1>Profil Pengguna</h1>

    <!-- Kartu Profil -->
    <div class="profile-card">

        <!-- Foto Profil -->
        <div class="profile-image" title="Klik untuk mengubah foto profil">
        </div>

        <!-- Informasi Pribadi -->
        <div class="profile-info">
            <div>
                <label for="name">Nama</label>
                <input id="name" type="text" bind:value={$profile.name} placeholder="Nama Pengguna" />
            </div>

            <div>
                <label for="email">Email</label>
                <input id="email" type="email" bind:value={$profile.email} placeholder="user@example.com" />
            </div>

            <div>
                <label for="phone">Nomor Telepon</label>
                <input id="phone" type="tel" bind:value={$profile.phone} placeholder="081234567890" />
            </div>

            <div>
                <label for="address">Alamat</label>
                <input id="address" type="text" bind:value={$profile.address} placeholder="Jl. Contoh Alamat, No. 123, Kota" />
            </div>
        </div>

        <!-- Tombol Update Profil -->
        <button class="update-button" on:click={updateProfile}>Perbarui Profil</button>

        <!-- Tombol Ganti Password -->
        <!-- Tombol Ganti Password -->
        <button class="update-button" on:click={goToChangePassword}>Ganti Password</button>

        <!-- Tombol Buat Saldo -->
        <button class="update-button" on:click={goToBalances}>Buat Saldo</button>


    </div>
</main>
