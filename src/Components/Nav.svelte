<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Spoonacular from '../Pages/Spoonacular.svelte';
</script>

<nav class="nav-bar">
  <div class="nav-left">
    <Link to="home" id="home-link-text">Cookeroo</Link>
    <style>
      #home-link-text {
        font-family: Satisfy, 'Courier New', Courier, monospace;
        font-size: 2em;
        margin-right: 10rem;
      }
    </style>
    <div class="nav-left-right-side">
      <Link to="spoonacular">Search</Link>
      <Link to="mycookbook">My Recipes</Link>
      <style>
        .nav-left-right-side {
          font-size: 1.2em;
          font-weight: bold;
        }
      </style>
    </div>
  </div>
  <Link to="/">
    <img src="/build/profileIcon.png" alt="profile logo" class="profile-logo" />
  </Link>
  <!-- <Link to="explore">Explore</Link> -->
</nav>

<style>
  
  .profile-logo:hover {
    background-color: rgba(132, 8, 144, 0.2);
  }
</style>
