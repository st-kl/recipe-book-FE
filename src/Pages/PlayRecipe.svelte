<script>
    import {useParams} from 'svelte-navigator';
    import {onMount} from 'svelte';
    import axios from 'axios';
    import SideNav from '../Components/SideNav.svelte';
    const params = useParams();
    let { id } = $params;
    let recipe;
    let ingredients = [];

    onMount(async () => {
        let response = await axios.get(`https://mycookeroo.herokuapp.com/api/recipes?recipeId=${id}`).then((response) => {
           recipe = response.data.recipes[0];
           ingredients = recipe.ingredients;
           console.log(recipe);
           console.log(ingredients);
        });
    });
</script>

<div>
    <SideNav>
        <h1>Play Recipe Page</h1>
        <h3>Ingredients:</h3>
        {#each ingredients as {name, amount, unit}}
        <label>
            <input type=checkbox>
            {amount} {unit} {name}
        </label>
        {/each}
    </SideNav>
</div>
