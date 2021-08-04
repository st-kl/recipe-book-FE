<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Spoonacular from '../Pages/Spoonacular.svelte';
  let source = "../assets/image.png"
</script>

<nav class="nav-bar">
  <div class="nav-left">
    <Link to="home" id="home-link-text">Cookeroo</Link>
    <div class="nav-left-right-side">
      <Link to="spoonacular">Search</Link>
      <Link to="mycookbook">My Recipes</Link>
    </div>
  </div>
  <Link to="/">
    <img src= {source} alt="profile logo" class="profile-logo" />
  </Link>
  <!-- <Link to="explore">Explore</Link> -->
</nav>
