<script>
    import { logout } from "../stores/authStore"; // Import fungsi logout dari authStore.js

    // Toggle dropdown visibility
    function toggleDropdown() {
        const dropdown = document.getElementById("dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    // Hide dropdown when clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.avatar')) {
            const dropdown = document.getElementById("dropdown");
            if (dropdown && dropdown.style.display === "block") {
                dropdown.style.display = "none";
            }
        }
    }
</script>

<header class="header">
    <div class="logo">Jagoan Finance</div>

    <div class="profile-menu">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" class="avatar" on:click={toggleDropdown} />
        <div id="dropdown" class="dropdown-content">
            <a href="#" on:click={logout}>Logout</a> <!-- Logout terintegrasi dengan authStore.js -->
        </div>
    </div>
</header>

<style>
    /* Styling tetap sama seperti sebelumnya */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 10;
    }
    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #000;
    }

    .profile-menu {
        position: relative;
    }
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: box-shadow 0.3s ease;
    }
    .avatar:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        top: 50px;
        background-color: white;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        overflow: hidden;
        min-width: 120px;
        z-index: 20;
    }
    .dropdown-content a {
        display: block;
        padding: 10px;
        color: #333;
        text-decoration: none;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }
    .dropdown-content a:hover {
        background-color: #f0f0f0;
    }
</style>
