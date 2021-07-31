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
  {$user.picture}
  <span class="text-white">&nbsp;&nbsp;{$user.name} ({$user.email})</span>
  {:else}<span>&nbsp;</span>{/if}

    {#if $isAuthenticated}
    <li class="nav-item">
      <a class="nav-link" href="/#" on:click="{logout}">Log Out</a>
    </li>
    {:else}
    <li class="nav-item">
      <a class="nav-link" href="/#" on:click="{login}">Log In</a>
    </li>
    {/if}
  {#if !$isAuthenticated}
  <div>
      <p>not authenticated</p>
  </div>
  {:else}
  <div>
      <p>authenticated</p>
  </div>
  {/if}
</div>