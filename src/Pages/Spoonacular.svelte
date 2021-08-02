<script>
  import SideNav from '../Components/SideNav.svelte';
  import Profile from '../Components/Profile.svelte';
  import Search from '../Components/Search.svelte';
  import Filter from '../Components/Filter.svelte';
  import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
  import Card from '../Components/Card.svelte';
  import axios from 'axios';
  import config from '../../config';
  import { afterUpdate, onMount } from 'svelte';
  import { Link } from 'svelte-navigator';

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
    const searchObj = { ...options };
    searchObj.params.query = searchTerm;
    options = searchObj;
    let response = await axios.get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
      options
    );
    results = response.data.results;
  };
</script>

<div>
  <h1>Spoonacular Page</h1>
  <SideNav>
    <Profile />
    <Search />
    <Filter />
    <RecipeScrapeUrl />
  </SideNav>
  <h3>Categories:</h3>
  <label> <input type="checkbox" bind:checked={visible} />Cuisine</label>
  {#if visible}
    <select bind:value={cuisine} on:change={handleChange}>
      {#each cuisines as cuisine}
        <option value={cuisine}>{cuisine}</option>
      {/each}
    </select>{/if}
  <h3>Dietary</h3>
  <label> <input type="checkbox" bind:checked={visibleDietary} />Dietary</label>
  {#if visibleDietary}
    <select bind:value={dietary} on:change={handleDiets}>
      {#each diets as diet}
        <option value={diet}>{diet}</option>
      {/each}
    </select>{/if}
  {#each results as result}
    <Link to="/recipe/{result.id}"
      ><Card>
        <p>{result.title}</p>
        <img
          src="https://spoonacular.com/recipeImages/{result.image}"
          alt="food"
          width="100px"
          height="100px"
        />
      </Card>
    </Link>
  {/each}
  <form on:submit={handleSubmit}>
    <input
      bind:value={searchTerm}
      id="search"
      placeholder="Enter search term here"
    />
    <button type="submit">Submit</button>
  </form>
</div>
