<script>
    // Variabel untuk menyimpan input pengguna
    let currentPassword = '';
    let newPassword = '';
    let message = ''; // Pesan untuk menampilkan respons dari API

    // Misalkan user_id didapatkan dari sumber lain (misalnya, dari global state atau context)
    let user_id = 1;

    // Fungsi untuk mengubah password
    async function changePassword() {
        // Validasi sederhana untuk memastikan bahwa semua field terisi
        if (!currentPassword || !newPassword) {
            message = "Please fill in all fields.";
            return;
        }

        // Buat request body
        const requestBody = {
            user_id,
            current_password: currentPassword,
            new_password: newPassword,
        };

        try {
            // Lakukan API call dengan fetch
            const response = await fetch("http://localhost:8080/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            // Parse response JSON
            const data = await response.json();

            if (response.ok) {
                // Jika response status OK, tampilkan pesan sukses
                message = data.message;
                // Reset form input
                currentPassword = '';
                newPassword = '';
            } else {
                // Jika ada error dari API, tampilkan pesan error
                message = data.message || "An error occurred. Please try again.";
                console.error("Error:", data);
            }
        } catch (error) {
            // Tangani error yang terjadi saat memanggil API
            message = "Failed to change password. Please check your connection.";
            console.error("Error:", error);

        }
    }
</script>

<section class="section-card">
    <h2>Change Password</h2>
    <div class="form-group">
        <label for="currentPassword">Current Password</label>
        <input id="currentPassword" type="password" bind:value={currentPassword} placeholder="Enter current password" />
    </div>
    <div class="form-group">
        <label for="newPassword">New Password</label>
        <input id="newPassword" type="password" bind:value={newPassword} placeholder="Enter new password" />
    </div>
    <button class="save-btn" on:click={changePassword}>Change Password</button>

    <!-- Tampilkan pesan dari API -->
    {#if message}
        <p class="message">{message}</p>
    {/if}
</section>

<style>
    .section-card {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .section-card:hover {
        transform: translateY(-5px);
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);
    }

    h2 {
        font-size: 1.5rem;
        color: #6200ee;
        margin-bottom: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .form-group label {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.3rem;
    }

    .form-group input[type="password"] {
        padding: 0.8rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-sizing: border-box;
    }

    .save-btn {
        background-color: #6200ee;
        color: white;
        border: none;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .save-btn:hover {
        background-color: #5300e8;
    }

    .message {
        margin-top: 1rem;
        font-size: 1rem;
        color: red;
    }
</style>
