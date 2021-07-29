<script>
    import SideNav from '../Components/SideNav.svelte';
    import Profile from '../Components/Profile.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
    import axios from 'axios';
    import {afterUpdate} from 'svelte'
    // import {slide} from ‘svelte/transition’;
	// import {quintOut} from ‘svelte/easing’;

    const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean','latin american'];

    let visible = false
    let cuisine = ""

    let result = []
    const handleChange = async ()=> {
        const options= { headers: {
        'x-rapidapi-key': config.key,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}, params:{cuisine:cuisine, number:"5"}};
         let response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random', options)
         console.log(response.data.result)
         result = response.data.result
     }//.then((response) => result = response.data.result);
    // console.log(result);
</script>

<div>
    <h1>Spoonacular Page</h1>
    <SideNav>
        <Profile />
        <Search />
        <Filter />
        <RecipeScrapeUrl />
    </SideNav>
    <h1>Categories:</h1>
    <label> <input type="checkbox" bind:checked={visible}>Cuisine</label>
    {#if visible} 
      <select bind:value={cuisine} on:change={handleChange}>
        {#each cuisines as cuisine}
        <option value={cuisine}>{cuisine}</option>
        {/each}
    </select>{/if}
    <p>{result}</p>
    <form>
        <input id="search" placeholder="Enter search term here">
        <button type="submit">Submit</button>
    </form>
</div>