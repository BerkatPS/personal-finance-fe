<script>
    import { onMount } from "svelte";
    import {get, writable} from "svelte/store";
    import { token } from "../stores/authStore";

    let transactions = writable([]);
    let balance = writable(0);
    let message = '';
    let isError = false;

    // Set your token here for authentication purposes.
    async function fetchTransactions() {
        try {
            const authToken = $token; // Gunakan nilai reaktif token
            const response = await fetch("http://localhost:8080/transactions", {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });

            // Cek apakah respons berhasil
            if (!response.ok) {
                // Jika error, coba dapatkan pesan teks (untuk error seperti "Invalid token")
                const errorText = await response.text();
                console.error("Error fetching transactions:", errorText);
                isError = true;
                message = errorText || "Gagal mengambil data transaksi.";
                return;
            }

            const data = await response.json();
            transactions.set(data);

        } catch (error) {
            console.error("Fetch error:", error);
            isError = true;
            message = "Gagal mengambil data transaksi.";
        }
    }

    async function deleteTransaction(id) {
        const tokenValue = get(token);
        try {
            const response = await fetch(`http://localhost:8080/transactions/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                isError = false;
                message = "Transaksi Berhasil dihapus!";
                transactions.update(trans => trans.filter(transaction => transaction.id !== id));
            } else {
                isError = true;
                message = data.message || "Gagal Menghapus Transaksi.";
            }
        } catch (error) {
            console.error("Delete error:", error);
            isError = true;
            message = "Gagal Menghapus Transaksi.";
        }
    }

    async function fetchBalance() {
        try {
            const tokenValue = get(token);  // Ambil token dari store
            const response = await fetch("http://localhost:8080/balance", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                balance.set(data.amount);
            } else {
                isError = true;
                message = data.message || "Gagal mengambil saldo.";
            }
        } catch (error) {
            console.error("Fetch error:", error);
            isError = true;
            message = "Gagal mengambil saldo.";
        }
    }

    onMount(() => {
        fetchTransactions();
        fetchBalance();
    });

    function goToTransactionForm() {
        window.location.href = '/transactionForm';
    }
</script>

<section class="balance-section">
    <h3>Current Balance</h3>
    <p class="balance">Rp{$balance.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</p>
</section>

<!-- Transactions Section -->
<section class="transaction-history">
    <section class="transaction-header">
        <button class="add-transaction-btn" on:click={goToTransactionForm}>Add New Transaction</button>
    </section>
    <h2>Transaction History</h2>
    {#if message}
        <p class="message {isError ? 'isError' : 'isSuccess'}">{message}</p>
    {/if}
    <ul class="transaction-list">
        {#each $transactions as transaction}
            <li class="transaction-card">
                <div class="transaction-header">
                    <h3>{transaction.description}</h3>
                    <p class="transaction-amount {transaction.type === 1 ? 'income' : 'expense'}">
                        {transaction.type === 1 ? '+ ' : '- '}Rp{transaction.amount.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div class="transaction-details">
                    <p><strong>Category:</strong> {transaction.type === 1 ? 'Income' : 'Expense'}</p>
                    <p><strong>Date:</strong> {new Date(transaction.created_at).toLocaleDateString()}</p>
                </div>
                <div class="transaction-actions">
                    <button class="edit-btn" title="Edit">✏️</button>
                    <button class="delete-btn" title="Delete" on:click={() => deleteTransaction(transaction.id)}>🗑️</button>
                </div>
            </li>
        {/each}
    </ul>
</section>




<style>
    :root {
        --main-bg: #f9fafc;
        --card-bg: #ffffff;
        --text-color: #333;
        --income-color: #4caf50;
        --expense-color: #f44336;
        --border-radius: 12px;
        --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .transaction-history {
        padding: 2rem;
        max-width: 900px;
        margin: 0 auto;
        background-color: var(--main-bg);
    }

    h2 {
        text-align: center;
        color: var(--text-color);
        font-size: 1.8rem;
        margin-bottom: 2rem;
    }
    .balance-section {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }

    .balance-section h3 {
        font-size: 1.5rem;
        color: var(--text-color);
    }

    .balance {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--income-color);
    }

    .add-transaction-btn {
        background-color: var(--income-color);
        color: white;
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .add-transaction-btn:hover {
        background-color: #43a047;
        transform: translateY(-2px);
    }
    .message {
        text-align: center;
        font-size: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: opacity 0.3s ease;
    }

    .message.isError {
        background-color: #fdecea;
        color: var(--expense-color);
    }

    .message.isSuccess {
        background-color: #e7f5e4;
        color: var(--income-color);
    }

    .transaction-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        padding: 0;
        list-style: none;
    }

    .transaction-card {
        padding: 1.5rem;
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .transaction-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    .transaction-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }

    .transaction-header h3 {
        font-size: 1.1rem;
        color: var(--text-color);
    }

    .transaction-amount {
        font-size: 1.1rem;
        font-weight: bold;
    }

    .transaction-amount.income {
        color: var(--income-color);
    }

    .transaction-amount.expense {
        color: var(--expense-color);
    }

    .transaction-details p {
        font-size: 0.9rem;
        color: #666;
    }

    .transaction-actions {
        display: flex;
        gap: 0.5rem;
    }

    .edit-btn, .delete-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        color: #666;
        transition: color 0.2s ease, transform 0.2s ease;
    }

    .edit-btn:hover {
        color: var(--income-color);
    }

    .delete-btn:hover {
        color: var(--expense-color);
    }

    .edit-btn:hover, .delete-btn:hover {
        transform: scale(1.1);
    }
</style>
