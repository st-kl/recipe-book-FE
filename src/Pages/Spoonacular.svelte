<script>
    import SideNav from '../Components/SideNav.svelte';
    import Profile from '../Components/Profile.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';

    const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean','latin american'];

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
    <ul>
        <h3>Cuisines:</h3>
        {#each cuisines as cuisine}
        <li>{cuisine}</li>
        {/each}
    </ul>
    <form>
        <input id="search" placeholder="Enter search term here">
        <button type="submit">Submit</button>
    </form>
</div>