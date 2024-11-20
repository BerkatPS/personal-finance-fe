<script>
    import BalanceCard from './BalanceCard.svelte';
    import SpendingOverview from './SpendingOverview.svelte';
    import StatisticsGraph from './StatisticsGraph.svelte';
    import RecentTransactions from './RecentTransactions.svelte';
</script>

<div class="dashboard-container">
    <div class="top-section">
        <BalanceCard />
        <SpendingOverview />
    </div>
    <div class="middle-section">
        <StatisticsGraph />
    </div>
    <div class="bottom-section">
        <RecentTransactions />
    </div>
</div>

<style>
    .dashboard-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        max-width: 100%; /* Memanfaatkan lebar penuh */
        color: var(--text-color-light);
    }

    .top-section {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Menampilkan dua kolom */
        gap: 2rem;
    }

    .middle-section, .bottom-section {
        background-color: var(--card-background);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        width: 100%; /* Memenuhi lebar penuh */
    }

    .middle-section:hover, .bottom-section:hover {
        transform: translateY(-3px);
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
    }

    /* Styling untuk menyesuaikan tampilan pada layar kecil */
    @media (max-width: 768px) {
        .top-section {
            grid-template-columns: 1fr;
        }
    }
</style>