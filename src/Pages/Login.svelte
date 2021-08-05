<script>
    import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user } from "../store";
  import { Router, Link, Route } from 'svelte-navigator';

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

{#if $isAuthenticated}
<div class="loginWrapper">
  <div class="logoAndNameWrapper">  <img class="loader" src="https://image.flaticon.com/icons/png/512/65/65956.png" alt="kangoroo" width="70" height="70">Cookeroo</div>
  <div><h1>You are logged in</h1>
  </div>
  <div class="buttonWrapper">   
    <button class="button" ><span><Link to="mycookbook">My Recipes</Link></span></button>
    <button class="button" on:click={logout}><span>Logout</span></button>
  </div>
</div>
  {:else}
    <div class="loginWrapper">
      <div class="logoAndNameWrapper">  <img class="loader" src="https://image.flaticon.com/icons/png/512/65/65956.png" alt="kangoroo" width="70" height="70">Cookeroo</div>
      <div><h1>Welcome To Cookeroo</h1>
        <h2>Your Online Recipe Book</h2>
      </div>
      <div class="buttonWrapper">   
        <button class="button" on:click={login}><span>Log In</span></button>
        <button class="button" on:click={login}><span>Sign Up</span></button>
      </div>
    </div>
    {/if}




<style>
.loginWrapper {
    margin-top: 200px;  
    width: 50%;
    margin: 200px auto;
    text-align:center;
  }

  .logoAndNameWrapper  {
    font-family: Satisfy, 'Courier New', Courier, monospace;
    font-size: 3rem;
    display: flex;
    justify-content: center;
  }

  .loader{
    margin-right: 20px;
  }

  h1 {
    margin: 30px 0 0 0;
  }

  h2 {
    margin-top: 0px;
    margin-bottom: 30px;
  }

  .buttonWrapper{
    display: flex;
    justify-content: center;
  }

  button  {
    font-size: 1.25rem;
    border-radius: 10px;
    padding: 10px 40px;
    border: solid black 1px;
    background-color: transparent;
    margin: 10px 20px;
    transition: all 0.5s;
    cursor: pointer;
  }


  .button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

  
</style>