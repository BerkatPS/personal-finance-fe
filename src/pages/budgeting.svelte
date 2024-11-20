    <script>
        import { writable, get } from 'svelte/store';
        import { onMount } from 'svelte';
        import { isAuthenticated, token } from '../stores/authStore';  // Periksa status autentikasi dan ambil token

        let budgetStore = writable([]);
        let name = '';
        let amount = '';
        let message = '';
        let isError = false;

        async function fetchBudgets() {
            if (!$isAuthenticated) {
                window.location.href = '/login';
                return;
            }

            try {
                const tokenValue = get(token); // Ambil token dari store
                const response = await fetch(`http://localhost:8080/budgets`, {
                    headers: {
                        "Authorization": `Bearer ${tokenValue}`,
                        "Content-Type": "application/json"
                    }
                });

                const rawData = await response.text(); // Ambil data mentah
                console.log("Data from API (raw):", rawData);

                let data;
                try {
                    data = JSON.parse(rawData); // Parsing JSON
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    throw new Error("Failed to parse response as JSON.");
                }

                console.log("Data after parsing JSON:", data);

                if (response.ok) {
                    if (Array.isArray(data)) {
                        const formattedData = data.map(budget => ({
                            id: budget.id,
                            name: budget.category,
                            amount: budget.budget_amount
                        }));
                        budgetStore.set(formattedData);
                        isError = false;
                        message = "";
                    } else {
                        console.error("Unexpected data format:", data);
                    }
                } else {
                    const errorMessage = data?.error || `Error: ${response.status}`;
                    console.error("API Error:", errorMessage);
                    throw new Error(errorMessage);
                }

            } catch (error) {
                console.error("Fetch error:", error);
                isError = true;
                message = error.message || "Gagal mengambil data budget.";
            }
        }

        // Fungsi untuk menambahkan budget baru melalui API
        async function addBudget() {
            if (!$isAuthenticated) {
                window.location.href = '/login'; // Redirect ke halaman login
                return;
            }

            if (name && amount) {
                const newBudget = {
                    category: name,
                    budget_amount: parseFloat(amount)
                };

                try {
                    const tokenValue = get(token); // Ambil token dari store
                    const response = await fetch("http://localhost:8080/budgets/create", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${tokenValue}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newBudget),
                    });

                    const rawData = await response.text();
                    console.log("Response from Add Budget (raw):", rawData);

                    const data = JSON.parse(rawData);

                    if (response.ok) {
                        name = '';
                        amount = '';
                        isError = false;
                        message = "Budget berhasil ditambahkan!";
                        await fetchBudgets(); // Refresh data
                    } else {
                        console.error("Error adding budget:", data);
                        throw new Error(data.error || "Failed to add budget");
                    }
                } catch (error) {
                    console.error("Add error:", error);
                    isError = true;
                    message = error.message || "Gagal menambahkan budget.";
                }
            }
        }

        async function deleteBudget(id) {
            if (!$isAuthenticated) {
                window.location.href = '/login';
                return;
            }

            try {
                const tokenValue = get(token); // Ambil token dari store
                const response = await fetch(`http://localhost:8080/budgets/${id}/delete`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${tokenValue}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    budgetStore.update(budgets => budgets.filter(budget => budget.id !== id));
                    isError = false;
                    message = "Budget berhasil dihapus!";
                } else {
                    const rawData = await response.text();
                    console.error("Error deleting budget:", rawData);
                    throw new Error("Failed to delete budget");
                }
            } catch (error) {
                console.error("Delete error:", error);
                isError = true;
                message = error.message || "Gagal menghapus budget.";
            }
        }

        // Panggil fetchBudgets saat halaman dimuat
        onMount(() => {
            if ($isAuthenticated) {
                fetchBudgets();
            } else {
                setCurrentPage(endpoints.LOGIN)
            }
        });
    </script>

    <main>
        <h1>Budgeting</h1>

        <!-- Pesan sukses atau error -->
        {#if message}
            <p class="{isError ? 'error' : 'success'}">{message}</p>
        {/if}

        <!-- Form untuk menambahkan budgeting -->
        <div class="form-card">
            <h2>Tambah Budgeting</h2>
            <div class="input-group">
                <label for="name">Nama Budgeting</label>
                <input id="name" type="text" placeholder="Contoh: Makan" bind:value={name}/>
            </div>
            <div class="input-group">
                <label for="amount">Jumlah</label>
                <input id="amount" type="number" placeholder="Contoh: 500000" bind:value={amount}/>
            </div>
            <button on:click={addBudget}>Tambah</button>
        </div>

        <!-- Daftar budgeting -->
        <div class="budget-list">
            <h2>Daftar Budgeting</h2>
            {#each $budgetStore as budget (budget.id)}
                <div class="budget-item">
                    <div>
                        <h3>{budget.name}</h3>
                        <p>Rp{budget.amount.toLocaleString()}</p>
                    </div>
                    <button class="delete-button" on:click={() => deleteBudget(budget.id)}>Hapus</button>
                </div>
            {/each}
        </div>
    </main>

    <style>
        main {
            font-family: var(--font-family);
            color: var(--text-color);
            background-color: var(--background-color);
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
        }

        h1, h2 {
            color: var(--primary-color);
            text-align: center;
        }

        .form-card {
            background-color: var(--card-background);
            box-shadow: var(--box-shadow);
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .form-card:hover {
            transform: translateY(-4px);
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        label {
            font-weight: 600;
            color: var(--text-color);
        }

        input[type="text"], input[type="number"] {
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 12px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #6200ee;
        }

        button {
            background: var(--button-background);
            color: var(--button-text-color);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        button:hover {
            background: #5300e8;
            transform: translateY(-2px);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }

        .budget-list {
            margin-top: 2rem;
        }

        .budget-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem;
            background-color: var(--card-background);
            box-shadow: var(--box-shadow);
            border-radius: 12px;
            margin-bottom: 1rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .budget-item:hover {
            transform: translateY(-4px);
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        }

        .budget-item h3 {
            color: var(--primary-color);
            font-size: 1.2rem;
            margin: 0;
        }

        .budget-item p {
            font-size: 1rem;
            color: #333;
            font-weight: 500;
            margin: 0.2rem 0 0;
        }

        .delete-button {
            background-color: #e53935;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .delete-button:hover {
            background-color: #d32f2f;
            transform: translateY(-2px);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }
    </style>