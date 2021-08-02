<script>
    import Profile from '../Components/Profile.svelte';
    import SideNav from '../Components/SideNav.svelte';
    import Search from '../Components/Search.svelte';
    import Filter from '../Components/Filter.svelte';
    import RecipeScrapeUrl from '../Components/RecipeScrapeUrl.svelte';
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
            
        </main>
    </div>

    <!-- url={url} result={result} -->