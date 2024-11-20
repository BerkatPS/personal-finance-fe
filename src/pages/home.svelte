<!--<script>-->
<!--    import { currentPage } from "../stores/currentPage.js";-->
<!--    import { onMount } from "svelte";-->

<!--    // Import komponen halaman-->
<!--    import Sidebar from '../components/sidebar.svelte';-->
<!--    import Header from '../components/header.svelte';-->
<!--    import Footer from '../components/footer.svelte';-->
<!--    import Analytics from './analytics.svelte';-->
<!--    import Transactions from './transactions.svelte';-->
<!--    import Settings from './settings.svelte';-->
<!--    import Budgeting from './budgeting.svelte';-->

<!--    // Fungsi untuk navigasi ke halaman baru-->
<!--    function navigate(route) {-->
<!--        currentPage.set(route);-->
<!--        window.history.pushState({}, "", route); // Ubah URL tanpa reload-->
<!--    }-->

<!--    // Perbarui currentPage berdasarkan URL saat ini saat halaman dimuat-->
<!--    onMount(() => {-->
<!--        currentPage.set(window.location.pathname);-->
<!--        window.onpopstate = () => {-->
<!--            currentPage.set(window.location.pathname);-->
<!--        };-->
<!--    });-->
<!--</script>-->

<!--<div id="app">-->
<!--    <Sidebar />-->
<!--    <div class="content">-->
<!--        <Header />-->
<!--        <main>-->
<!--            {#if $currentPage === '/'}-->
<!--                <Budgeting />-->
<!--            {:else if $currentPage === '/analytics'}-->
<!--                <Analytics />-->
<!--            {:else if $currentPage === '/budgeting'}-->
<!--                <Budgeting />-->
<!--            {:else if $currentPage === '/settings'}-->
<!--                <Settings />-->
<!--            {:else if $currentPage === '/transactions'}-->
<!--                <Transactions />-->
<!--            {:else}-->
<!--                <p>Halaman tidak ditemukan</p>-->
<!--            {/if}-->
<!--        </main>-->
<!--        <Footer />-->
<!--    </div>-->
<!--</div>-->

<!--<style>-->
<!--    #app {-->
<!--        display: flex;-->
<!--    }-->
<!--    .content {-->
<!--        flex: 1;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--    }-->
<!--    main {-->
<!--        padding: 2rem;-->
<!--        flex-grow: 1;-->
<!--        background-color: var(&#45;&#45;background-color);-->
<!--        min-height: 100vh;-->
<!--    }-->
<!--</style>-->
