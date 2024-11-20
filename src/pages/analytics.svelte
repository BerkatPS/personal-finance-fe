<script>
    import { onMount, tick } from "svelte";
    import { token } from "../stores/authStore";
    import Chart from "chart.js/auto";

    let monthlyReport = [];
    let expenseCategories = [];
    let isLoading = true;
    let isError = false;
    let message = '';

    let expenseChart; // Referensi Chart.js instance
    let canvasElement; // Referensi ke elemen canvas

    function formatToRupiah(value) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
    }

    async function fetchMonthlyReports() {
        try {
            const response = await fetch("http://localhost:8080/analytics/monthly-reports", {
                headers: {
                    "Authorization": `Bearer ${$token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    monthlyReport = data.map(report => ({
                        ...report,
                        balance: report.final_balance,
                    }));
                    isError = false;
                } else {
                    message = "Tidak ada data laporan bulanan tersedia.";
                    isError = false;
                }
            } else {
                throw new Error(`Gagal memuat data: ${response.status}`);
            }
        } catch (error) {
            console.error("Kesalahan saat mengambil data laporan:", error);
            isError = true;
            message = error.message || "Gagal memuat laporan bulanan.";
        } finally {
            isLoading = false;
        }
    }

    async function fetchExpenseCategories() {
        try {
            const response = await fetch("http://localhost:8080/analytics/category-expenses", {
                headers: {
                    "Authorization": `Bearer ${$token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                expenseCategories = data;
                isError = false;

                // Tunggu hingga elemen canvas selesai dirender
                await tick(); // Pastikan DOM sudah diperbarui
                renderExpenseChart();
            } else {
                throw new Error(`Gagal memuat data: ${response.status}`);
            }
        } catch (error) {
            console.error("Kesalahan saat mengambil data kategori pengeluaran:", error);
            isError = true;
            message = error.message || "Gagal memuat kategori pengeluaran.";
        }
    }

    function renderExpenseChart() {
        if (!canvasElement) {
            console.error("Elemen canvas tidak tersedia! Pastikan elemen dirender sebelum memanggil fungsi ini.");
            return;
        }

        const ctx = canvasElement.getContext("2d");

        // Hancurkan chart jika sudah ada instance sebelumnya
        if (expenseChart) {
            expenseChart.destroy();
        }

        // Pastikan data tidak kosong
        if (expenseCategories.length === 0) {
            console.error("Data kategori pengeluaran kosong.");
            return;
        }

        // Render chart baru
        expenseChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: expenseCategories.map(category => category.description),
                datasets: [
                    {
                        label: "Pengeluaran per Kategori Rp",
                        data: expenseCategories.map(category => category.total),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    }
                }
            }
        });
    }

    onMount(() => {
        fetchMonthlyReports();
        fetchExpenseCategories();
    });
</script>

<main>
    <h1>Laporan dan Analisis Keuangan</h1>

    {#if isLoading}
        <p class="loading">Memuat laporan bulanan...</p>
    {:else if isError}
        <p class="error">{message}</p>
    {:else}
        <div class="table-card">
            <h2>Laporan Bulanan</h2>
            {#if monthlyReport.length > 0}
                <table>
                    <thead>
                    <tr>
                        <th>Bulan</th>
                        <th>Pendapatan</th>
                        <th>Pengeluaran</th>
                        <th>Saldo Akhir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each monthlyReport as report}
                        <tr>
                            <td>{report.month}</td>
                            <td>{formatToRupiah(report.income)}</td>
                            <td>{formatToRupiah(report.expense)}</td>
                            <td>{formatToRupiah(report.balance)}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else}
                <p>Tidak ada data laporan bulanan tersedia.</p>
            {/if}
        </div>

        <div class="chart-card">
            <h2>Statistik Pengeluaran Berdasarkan Kategori</h2>
            {#if expenseCategories.length > 0}
                <canvas bind:this={canvasElement}></canvas>
            {:else}
                <p>Tidak ada data kategori pengeluaran tersedia.</p>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        font-family: var(--font-family);
        color: var(--text-color);
        background-color: var(--background-color);
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    h1, h2 {
        color: var(--primary-color);
        text-align: center;
    }

    .table-card, .chart-card {
        background-color: var(--card-background);
        box-shadow: var(--box-shadow);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    th, td {
        padding: 0.75rem;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
    }

    th {
        background-color: #f0f2f5;
        font-weight: bold;
    }

    .error {
        color: red;
        text-align: center;
    }

    .loading {
        text-align: center;
        font-size: 1.2rem;
        color: var(--primary-color);
    }
</style>
