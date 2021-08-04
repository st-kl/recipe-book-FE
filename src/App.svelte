<script>
  import { Router, Link, Route, useParams } from 'svelte-navigator';
  import CreateRecipe from './Pages/CreateRecipe.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
  import MyCookBook from './Pages/MyCookBook.svelte';
  import Planner from './Pages/Planner.svelte';
  import PlayRecipe from './Pages/PlayRecipe.svelte';
  import Spoonacular from './Pages/Spoonacular.svelte';
  import UserRecipes from './Pages/UserRecipes.svelte';
  import Users from './Pages/Users.svelte';
  import ViewRecipe from './Pages/ViewRecipe.svelte';
  import Nav from './Components/Nav.svelte';
  import ViewMyRecipe from './Pages/ViewMyRecipe.svelte';
</script>

<Router>



  <Nav />

  <div class=whole-app>
    <Route path="/">
      <Login />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/mycookbook">
      <MyCookBook />
    </Route>
    <Route path="/recipes/:recipeId">
      <ViewMyRecipe />
    </Route>
    <Route path="/spoonacular">
      <Spoonacular />
    </Route>
    <Route path="/planner">
      <Planner />
    </Route>
    <Route path="/createrecipe">
      <CreateRecipe />
    </Route>
    <Route path="/explore">
      <Users />
    </Route>
    <Route path="/recipe/:id">
      <ViewRecipe />
    </Route>
    <Route path="/play/:id">
			<PlayRecipe />
		</Route>
  </div>


</Router>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
