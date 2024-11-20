<script>
    // Fungsi navigasi sederhana untuk berpindah halaman
    function handleNavigation(path) {
        window.location.href = path; // Mengarahkan ke URL yang diinginkan
    }
</script>

<aside class="sidebar">
    <div class="logo">Jagoan Finance</div>
    <nav class="nav-links">
        <!-- Gunakan handleNavigation untuk navigasi -->
        <a class="nav-link" on:click={() => handleNavigation("/")}>🏠 Dashboard</a>
        <a class="nav-link" on:click={() => handleNavigation("/transactions")}>💰 Transactions</a>
        <a class="nav-link" on:click={() => handleNavigation("/analytics")}>📊 Analytics</a>
        <a class="nav-link" on:click={() => handleNavigation("/budgeting")}>💳 Budgeting</a>
        <a class="nav-link" on:click={() => handleNavigation("/profile")}>⚙️ Settings</a>
    </nav>
</aside>

<style>
    .sidebar {
        width: 250px;
        background: linear-gradient(135deg, #6200ee, #5300e8);
        color: #ffffff;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .logo {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        color: #ffffff;
        text-align: center;
    }

    .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .nav-link {
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 0.8rem 1rem;
        font-size: 1.1rem;
        font-weight: 500;
        color: #ffffff;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        text-decoration: none;
        border-radius: 8px;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateX(10px);
    }
</style>
