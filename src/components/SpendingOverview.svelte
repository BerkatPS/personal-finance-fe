<div class="spending-overview">
    <h2>Spending Overview</h2>
    <p class="amount">$12,521.10</p>
    <div class="category-bars">
        <div class="category">
            <span>Friend & Family</span>
            <div class="bar" style="width: 40%"></div>
            <span>$5,121.80</span>
        </div>
        <div class="category">
            <span>Subscription</span>
            <div class="bar" style="width: 20%"></div>
            <span>$2,321.80</span>
        </div>
        <div class="category">
            <span>Other</span>
            <div class="bar" style="width: 40%"></div>
            <span>$5,169.80</span>
        </div>
    </div>
</div>

<style>
    .spending-overview {
        flex: 1;
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);
    }
    .amount {
        font-size: 2rem;
        color: #6200ee;
        margin: 1rem 0;
    }
    .category {
        display: flex;
        align-items: center;
        margin-top: 0.8rem;
    }
    .bar {
        height: 12px;
        background-color: #6200ee;
        border-radius: 6px;
        margin: 0 1rem;
        flex: 1;
        transition: width 0.3s ease;
    }
    .category:hover .bar {
        background-color: #5300e8;
    }
</style>
