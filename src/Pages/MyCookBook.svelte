<script>
    import Profile from '../Components/Profile.svelte';
    import SideNav from '../Components/SideNav.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
    import axios from 'axios';
    import {onMount} from 'svelte';

    let recipes = [];

    onMount(async () => {
        let response = await axios.get('https://mycookeroo.herokuapp.com/api/recipes?userId=1').then((response) => {
            recipes = response.data.recipes;
            console.log(recipes);
        });
    })
    </script>
    
    <div>
        <h1>MyCookBook Page</h1>
        <SideNav>
            <Profile />
            <Search />
            <Filter />
            <RecipeScrapeUrl />
        </SideNav>
            <ul>
            {#each recipes as recipe (recipe._id)}
            <section>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="100px" height="100px">
            {#if recipe.servings}
            <p>Serves: {recipe.servings}</p>
            {/if}
            {#if recipe.totalTime}
            <p>Total Time: {recipe.totalTime}m</p>
            {:else if recipe.totalCookTime}
            <p>Total Time: {recipe.totalCookTime}m</p>
            {/if}
            {#if recipe.vegan}
            <p>VE</p>
            {:else if recipe.vegetarian}
            <p>VEG</p>
            {:else if recipe.dairyFree}
            <p>DF</p>
            {:else if recipe.glutenFree}
            <p>GF</p>
            {/if}
            <button>Start</button>
            </section>
            {/each}
        </ul>
    </div>

  