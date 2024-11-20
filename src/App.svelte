<script>
  import { currentPage, endpoints } from "./stores/currPage.js";
  import { onMount } from "svelte";
  import { isAuthenticated, logout } from "./stores/authStore.js";

  import Sidebar from './components/sidebar.svelte';
  import Header from './components/header.svelte';
  import Footer from './components/footer.svelte';
  import Analytics from './pages/analytics.svelte';
  import Transactions from './pages/transactions.svelte';
  import Settings from './pages/settings.svelte';
  import Profile from './pages/profile.svelte';
  import Budgeting from './pages/budgeting.svelte';
  import Balance from './pages/balance.svelte';
  import Login from './pages/login.svelte';
  import Register from './pages/register.svelte';
  import TransactionsForm from "./pages/transactionForm.svelte";
  import ChangePassword from "./pages/settings.svelte";
  import Dashboard from "./pages/dashboard.svelte";

  function navigate(route) {
    currentPage.set(route);
    window.history.pushState({}, "", route);
  }

  onMount(() => {
    const path = window.location.pathname;

    // Periksa apakah pengguna sudah login
    if (!$isAuthenticated) {
      // Jika tidak login dan mengakses selain /login atau /register, arahkan ke halaman login
      if (path !== endpoints.LOGIN && path !== endpoints.REGISTER) {
        currentPage.set(endpoints.LOGIN);
        window.history.pushState({}, "", endpoints.LOGIN);
      } else {
        currentPage.set(path); // tetap di halaman login atau register
      }
    } else {
      // Jika sudah login, biarkan pengguna mengakses halaman yang sesuai
      currentPage.set(path);
    }

    // Pastikan navigasi kembali (back) ke halaman yang sesuai
    window.onpopstate = () => {
      currentPage.set(window.location.pathname);
    };
  });
</script>

<div id="app">
  {#if $currentPage === endpoints.LOGIN}
    <!-- Hanya tampilkan halaman login jika pengguna mengakses /login -->
    <div class="page-wrapper">
      <Login/>
    </div>
  {:else if $currentPage === endpoints.REGISTER}
    <!-- Hanya tampilkan halaman register jika pengguna mengakses /register -->
    <div class="page-wrapper">
      <Register/>
    </div>
  {:else}
    <!-- Tampilkan Sidebar, Header, dan konten utama jika pengguna sudah login -->
    {#if $isAuthenticated}
      <Sidebar/>
      <div class="content">
        <Header/>
        <main>
          {#if $currentPage === endpoints.HOME}
            <Dashboard/>
          {:else if $currentPage === endpoints.ANALYTICS}
            <Analytics/>
          {:else if $currentPage === endpoints.BALANCE}
            <Balance/>
          {:else if $currentPage === endpoints.BUDGETING}
            <Budgeting/>
          {:else if $currentPage === endpoints.PROFILE}
            <Profile/>
          {:else if $currentPage === endpoints.SETTINGS}
            <Settings/>
          {:else if $currentPage === endpoints.TRANSACTIONS}
            <Transactions/>
          {:else if $currentPage === endpoints.TRANSACTION_FORM}
            <TransactionsForm/>
          {:else if $currentPage === endpoints.CHANGE_PASSWORD}
            <ChangePassword/>
          {:else}
            <p>Halaman tidak ditemukan</p>
          {/if}
        </main>
        <Footer/>
      </div>
    {/if}
  {/if}
</div>

<style>
  #app {
    display: flex;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  main {
    padding: 2rem;
    flex-grow: 1;
    background-color: var(--background-color);
    min-height: 100vh;
  }

  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #e9ecef;
    padding: 1rem;
  }
</style>
