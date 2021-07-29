<script>
    import SideNav from '../Components/SideNav.svelte';
    import Profile from '../Components/Profile.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
    import Card from '../Components/Card.svelte';
    import axios from 'axios';
    import config from '../../config';
    
    const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean','latin american'];
    let visible = false
    let cuisine = ""
    let results = []

    const handleChange = async (event)=> {
        const options= { headers: {
        'x-rapidapi-key': config.key,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}, params:{cuisine:cuisine, number:"5"}};
         let response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random', options)
         results = response.data.recipes
         }
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
    {#each results as result}
    <a href={result.sourceUrl}><Card>
        <p>{result.title}</p>
        <img src={result.image} alt="food" width="100px" height="100px">
    </Card>
</a>
    {/each}
    <form>
        <input id="search" placeholder="Enter search term here">
        <button type="submit">Submit</button>
    </form>
</div>

