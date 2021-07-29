<script>
    import SideNav from '../Components/SideNav.svelte';
    import Profile from '../Components/Profile.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
    // import {slide} from ‘svelte/transition’;
	// import {quintOut} from ‘svelte/easing’;

    const cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean','latin american'];

    let visible = false

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
    <ul>    
        {#each cuisines as cuisine}
        <li>{cuisine}</li>
        {/each}
    </ul>{/if}
    
    <form>
        <input id="search" placeholder="Enter search term here">
        <button type="submit">Submit</button>
    </form>
</div>