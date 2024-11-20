<div class="balance-card">
    <h2>Total Balance</h2>
    <p class="balance-amount">$82,758.10</p>
    <div class="accounts">
        <div class="account-card">
            <p>$22,426.10</p>
            <small>**** 3452</small>
            <button>Details</button>
        </div>
        <div class="account-card">
            <p>$50,322.00</p>
            <small>**** 1245</small>
            <button>Details</button>
        </div>
    </div>
</div>

<style>
    .balance-card {
        flex: 1;
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .balance-card:hover {
        transform: translateY(-5px);
        box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.2);
    }
    .balance-amount {
        font-size: 2.8rem;
        color: #6200ee;
        margin: 1rem 0;
    }
    .accounts {
        display: flex;
        gap: 1.5rem;
    }
    .account-card {
        background-color: rgba(98, 0, 238, 0.05);
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        flex: 1;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    }
    button {
        margin-top: 1rem;
        background-color: #6200ee;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #5300e8;
    }
</style>
