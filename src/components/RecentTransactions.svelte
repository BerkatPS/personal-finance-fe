<div class="recent-transactions">
    <h2>Recent Transactions</h2>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Transaction</th>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>John Doe</td>
            <td>Transfer</td>
            <td>2024-11-05 14:32</td>
            <td>$500.00</td>
            <td class="status-completed">Completed</td>
        </tr>
        </tbody>
    </table>
</div>

<style>
    .recent-transactions {
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);
        overflow-x: auto;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .recent-transactions:hover {
        transform: translateY(-5px);
        box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.2);
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }
    th {
        background-color: rgba(98, 0, 238, 0.05);
        font-weight: bold;
    }
    .status-completed {
        color: #4caf50;
        font-weight: bold;
    }
</style>
