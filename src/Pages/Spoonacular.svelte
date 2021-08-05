<script>
  import SideNav from '../Components/SideNav.svelte';
  import Profile from '../Components/Profile.svelte';
  import Search from '../Components/Search.svelte';
  import Filter from '../Components/Filter.svelte';
  import Dropdowns from '../Components/Dropdowns.svelte';
  import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
  import Card from '../Components/Card.svelte';
  import axios from 'axios';
  import config from '../../config';
  import { afterUpdate, onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
import Loader from '../Components/Loader.svelte';


  const cuisines = [
    'african',
    'chinese',
    'japanese',
    'korean',
    'vietnamese',
    'thai',
    'indian',
    'british',
    'irish',
    'french',
    'italian',
    'mexican',
    'spanish',
    'middle eastern',
    'jewish',
    'american',
    'cajun',
    'southern',
    'greek',
    'german',
    'nordic',
    'eastern european',
    'caribbean',
    'latin american',
  ];
  const diets = [
    'vegan',
    'vegetarian',
    'pescatarian',
    'lacto vegetarian',
    'ovo vegetarian',
  ];

  let submitSearch = false;
  let visible = false;
  let cuisine = '';
  let dietary = '';
  let visibleDietary = false;
  let results = [];
  let searchTerm = '';
  let options = {
    headers: {
      'x-rapidapi-key': config.key,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
    params: { number: '5' },
  };

  const handleChange = async (event) => {
    const searchObj = { ...options };
    searchObj.params.cuisine = cuisine;
    options = searchObj;
    let response = await axios.get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
      options
    );
    results = response.data.results;
  };

  const handleDiets = async (event) => {
    const searchObj = { ...options };
    searchObj.params.diet = dietary;
    options = searchObj;
    let response = await axios.get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
      options
    );
    results = response.data.results;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    submitSearch = true;
    const searchObj = { ...options };
    searchObj.params.query = searchTerm;
    options = searchObj;
    let response = await axios.get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
      options
    );
    results = response.data.results;
    submitSearch = false;
  };

  
</script>

<div class="spoonacular-page">
  <h1>Spoonacular Page</h1>
  <SideNav>
    <div class="side-nav-contents">
      <div class="recipe-search">
        <h3>Recipe Search</h3>
        <form on:submit={handleSubmit}>
          <input
            class="search"
            bind:value={searchTerm}
            id="search"
            placeholder="Enter search term here"
          />
          <button class="search" type="submit">Search</button>
        </form>
      </div>
      <style>
        button {
          padding: 0.5em 2em;
          background-color: black;
          color: white;
          border-radius: 0.2em;
        }
        button:hover {
          background-color: rgb(132, 8, 144);
        }
        #search {
          width: 200px;
          height: 30px;
          margin: 0 0 10px 0;
          padding-left: 2em;
          font-size: 1em;
        }
      </style>
      <div class="filter">
        <h3>Categories</h3>
        <label>
          <input
            class="checkbox"
            type="checkbox"
            bind:checked={visible}
          />Cuisine Menu</label
        >
      </div>
      <div class="filter" id="bottom-checkbox">
        <h3>Dietary</h3>
        <label>
          <input
            class="checkbox"
            type="checkbox"
            bind:checked={visibleDietary}
          />Dietary Menu</label
        >
      </div>
      <style>
        .filter {
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        label {
          display: flex;
          width: 200px;
          align-items: center;
          justify-content: flex-start;
        }
        input {
          width: 2em;
        }
        .checkbox {
          margin-left: 1em;
        }
        #bottom-checkbox {
          margin-bottom: 100px;
        }
      </style>
    </div>
  </SideNav>
  <div class="main-content">
    {#if submitSearch === true}
    <Loader></Loader>
   {:else}
    <div class="spoonacular-recipes">
      {#if visible}
        <select id="cuisine-drop" bind:value={cuisine} on:change={handleChange}>
          {#each cuisines as cuisine}
            <option value={cuisine}>{cuisine}</option>
          {/each}
        </select>{/if}
      {#if visibleDietary}
        <select id="diet-drop" bind:value={dietary} on:change={handleDiets}>
          {#each diets as diet}
            <option value={diet}>{diet}</option>
          {/each}
        </select>{/if}
      {#each results as result}
        <Link to="/recipe/{result.id}">
          <Card>
            <div class="small-recipe-card">
              <img
                src="https://spoonacular.com/recipeImages/{result.image}"
                alt="food"
                class="small-recipe-image"
              />
              <p class="card-text">{result.title}</p>
            </div>
          </Card>
        </Link>
      {/each}
    </div>
    {/if}
  </div>
</div>

<style>
  #cuisine-drop {
    position: fixed;
    height: 40px;
    width: 150px;
    top: 440px;
    left: 90px;
  }
  #diet-drop {
    position: fixed;
    height: 40px;
    width: 150px;
    top: 570px;
    left: 90px;
  }
  .spoonacular-recipes {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
  }
  
  .card-text {
    padding: 0 1em;
  }
</style>
