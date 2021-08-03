<script>
    import {useParams} from 'svelte-navigator';
    import { fly, fade } from 'svelte/transition';
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
    let endIndex = 1;

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

    const prevStep = () => {
        endIndex = endIndex - 1
    }
    
    const nextStep = () => {
        endIndex = endIndex + 1
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
    <button on:click={prevStep} disabled={endIndex <= 1}>Back</button>
    <button on:click={nextStep}>Next</button>
    <main class="steps">
        {#if steps.length !== 0}
        {#each steps.slice(0, endIndex) as {number, step, instructions}, i}
        <Card>
            <p in:fly="{{ delay: 100, y: 200, opacity: 0.9, duration: 1000}}" out:fade>{number}: {step}</p>
        </Card>
        {/each}
        {:else}
        {#each instructions.slice(0, endIndex) as instruction, i}
        <Card>
        <p>{i + 1}: {instruction}</p>
        </Card>
        {/each}
        {/if}
    </main>
    {/if}
    {/if}
</div>
