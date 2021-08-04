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
    <div class="main-content">
    <h1>{title}</h1>
    <button class="start" on:click={startRecipe}>{!start ? "Let's Get Cooking!" : "I Need A Break!"}</button>
    {#if start}
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
        <p in:fly="{{ delay: 100, y: 200, opacity: 0.9, duration: 1000}}" out:fade>{i + 1}: {instruction}</p>
        </Card>
        {/each}
        {/if}
    </main>
    <button class="controls" id="back" on:click={prevStep} disabled={endIndex <= 1}>Back</button>
    <button class="controls" id="next" on:click={nextStep} disabled={endIndex === steps.length || endIndex === instructions.length}>Next</button>
    {/if}
</div>
{/if}
</div>

<style>
    .main-content h1 {
        position: absolute;
        top: 1em;
    }
    .steps {
        font-size: 30px;
    }
    .start {
        position: absolute;
        bottom: 4em;
    }
    .controls {
        display: inline;
        position: absolute;
        bottom: 1em;
        margin-left: 1em;
    }
    .steps {
        text-align: center;
    }
    #back {
        margin-right: 5em;
    }
    #next {
        margin-left: 5em;
    }
</style>