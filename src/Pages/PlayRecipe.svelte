<script>
    import {useParams} from 'svelte-navigator';
    import {onMount} from 'svelte';
    import axios from 'axios';
    import SideNav from '../Components/SideNav.svelte';
    import Card from '../Components/Card.svelte';
    const params = useParams();
    let { id } = $params;
    let recipe;
    let ingredients = [];
    let steps = [];
    let instructions = [];

    onMount(async () => {
        let response = await axios.get(`https://mycookeroo.herokuapp.com/api/recipes?recipeId=${id}`).then((response) => {
           recipe = response.data.recipes[0];
           ingredients = recipe.ingredients;
           !recipe.steps ? instructions = recipe.instructions : steps = recipe.steps;
        });
    });
</script>

<div>
    <SideNav>
        <h3>Ingredients:</h3>
        {#each ingredients as {name, amount, unit}}
        <label>
            <input type=checkbox>
            {amount} {unit} {name} 
        </label>
        {/each}
    </SideNav>
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
</div>


