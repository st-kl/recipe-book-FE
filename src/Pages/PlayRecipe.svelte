<script>
    import {useParams} from 'svelte-navigator';
    import {onMount} from 'svelte';
    import axios from 'axios';
    import SideNav from '../Components/SideNav.svelte';
    import Card from '../Components/Card.svelte';
    const params = useParams();
    let { id } = $params;
    let recipe;
    let title;
    let start = false;
    let ingredients = [];
    let steps = [];
    let instructions = [];

    onMount(async () => {
        let response = await axios.get(`https://mycookeroo.herokuapp.com/api/recipes?recipeId=${id}`).then((response) => {
           recipe = response.data.recipes[0];
           title = recipe.title;
           ingredients = recipe.ingredients;
           !recipe.steps ? instructions = recipe.instructions : steps = recipe.steps;
        });
    });

    const startRecipe = () => {
        start = !start;
    }
</script>

<div>
    {#if !recipe}
    <h1>Loading Recipe to Play...</h1>
    {:else}
    <SideNav>
        <h3>Ingredients:</h3>
        {#each ingredients as {name, amount, unit}}
        <label>
            <input type=checkbox>
            {amount} {unit} {name} 
        </label>
        {/each}
    </SideNav>
    <h1>{title}</h1>
    <button on:click={startRecipe}>{!start ? "Let's Get Cooking!" : "I Need A Break!"}</button>
    {#if start}
    <main class="steps">
        {#if steps.length !== 0}
        {#each steps as {number, step, instructions}}
        <Card>
            <p>{number}: {step}</p>
        </Card>
        {/each}
        {:else}
        {#each instructions as instruction, i}
        <Card>
            <p>{i + 1}: {instruction}</p>
        </Card>
        {/each}
        {/if}
    </main>
    {/if}
    {/if}
</div>

