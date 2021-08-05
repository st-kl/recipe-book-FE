<script>
  import Profile from '../Components/Profile.svelte';
  import SideNav from '../Components/SideNav.svelte';
  import Search from '../Components/Search.svelte';
  import Filter from '../Components/Filter.svelte';
  import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
  import Card from '../Components/Card.svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
import Loader from '../Components/Loader.svelte';


  let recipes = [];

  onMount(async () => {
    let response = await axios
      .get('https://mycookeroo.herokuapp.com/api/recipes?userId=1')
      .then((response) => {
        recipes = response.data.recipes;
      });
  });
</script>

<div>
  <h1>MyCookBook Page</h1>
  <SideNav>
    <div class="side-nav-contents">
      <Profile />
      <Search />
      <!-- <RecipeScrapeUrl /> -->
      <Link to="/createrecipe"
        ><button id="create-recipe">Create Recipe</button></Link
      >
    </div>
    <style>
      #create-recipe {
        background-color: black;
        width: 230px;
        height: 50px;
        border-radius: 0.2em;
        color: white;
      }
      #create-recipe:hover {
        background-color: rgb(132, 8, 144);
      }
    </style>
  </SideNav>
  <div class="main-content">
    {#if recipes.length === 0}
     <Loader></Loader>
    {:else}
      <div class="recipes">
        {#each recipes as recipe (recipe._id)}
          <Link to="/recipes/{recipe._id}">
            <Card>
              <div class="small-recipe-card">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  class="small-recipe-image"
                />
                <p class="card-text">{recipe.title}</p>
              </div>
              <!-- {#if recipe.servings}
                    <p>Serves: {recipe.servings}</p>
                    {/if}
                    {#if recipe.totalTime}
                    <p>Total Time: {recipe.totalTime}m</p>
                    {:else if recipe.totalCookTime}
                    <p>Total Time: {recipe.totalCookTime}m</p>
                    {/if}
                    {#if recipe.vegan}
                    <p>Ve</p>
                    {:else if recipe.vegetarian}
                    <p>V</p>
                    {:else if recipe.dairyFree}
                    <p>DF</p>
                    {:else if recipe.glutenFree}
                    <p>GF</p>
                    {/if} -->
              <!-- <Link to="/play/{recipe._id}"><button>Start</button></Link> -->
            </Card>
          </Link>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .card-text {
    padding: 0 1em;
  }
</style>
