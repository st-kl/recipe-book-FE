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
        <section>
            <p>new section here</p>
        </section>
    </div>

    <!-- url={url} result={result} -->