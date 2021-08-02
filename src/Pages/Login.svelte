<script>
    import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user } from "../store";

  let auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
</script>


<div>
  {#if $isAuthenticated}
  <span class="text-white">&nbsp;&nbsp;{$user.email}</span>
  {:else}<span>&nbsp;</span>{/if}

    {#if $isAuthenticated}
    <button on:click={logout}>Log Out</button>
    {:else}
    <button on:click={login}>Log In</button>
    <button on:click={login}>Sign Up</button>
    {/if}
</div>