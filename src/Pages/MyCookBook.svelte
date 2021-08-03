<script>
  import axios from 'axios';
  import config from '../../config';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';
  import Profile from '../Components/Profile.svelte';
  import SideNav from '../Components/SideNav.svelte';
  import Search from '../Components/Search.svelte';
  import Filter from '../Components/Filter.svelte';
  import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';

  // USER ID HARDCODED FOR NOW

let results =[]

  onMount(async () => {
    let response = await axios
      .get(`https://mycookeroo.herokuapp.com/api/recipes?userId=1`)
      results = response.data.recipes
      console.log(results[0].title)
  });
</script>

<div>
  <h1>MyCookBook Page</h1>
  <SideNav>
    <Profile />
    <Search />
    <Filter />
    <RecipeScrapeUrl />
  </SideNav>
  <main class="my-cookbook">
    {#each results as result}
    <Card><h3 class="myRecipeTitle">
      {result.title}
    </h3>
  </Card>
  {/each}
  <main/>
</div>

<!-- url={url} result={result} -->
