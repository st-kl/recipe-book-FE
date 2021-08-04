<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';

  let editOptions = false;
  const params = useParams();
  const toggleEditing = () => (editOptions = !editOptions);
  let instructions = [];
  let ingredients = [];
  let recipe = [];

  onMount(async () => {
    let response = await axios
      .get(
        `https://mycookeroo.herokuapp.com/api/recipes?recipeId=${$params.recipeId}`
      )
      .then((response) => {
        recipe = response.data.recipes[0];
        instructions = recipe.instructions;
        ingredients = recipe.ingredients;
        console.log(recipe);
      });
  });
  // THIS FUNCTION NEEDS TO BE
  const patchRecipe = async () => {
    recipe.ingredients = ingredients;
    await axios
      .patch(
        `https://mycookeroo.herokuapp.com/api/recipes/${$params.recipeId}`,
        recipe
      )
      .then((response) => {
        console.log(response, recipe, 'POST ZZZZZZ<<<<<<<');
      });
  };
</script>

<div>
  <h1>View Recipe Page</h1>

  <ul>
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt="featured recipe" class="recipe-pic" />
    <button on:click={patchRecipe} class="save-button"> SAVE </button>
    <ul>
      <li>Total Cook Time: {recipe.totalCookTime} mins</li>
      <li>Ingredients:</li>
      <ul>
        {#each ingredients as ingredient, i}
          <li id={i}>
            {ingredient.name}: {ingredient.amount}
            {ingredient.unit}
          </li>
          {#if editOptions}
            <input type="text" bind:value={ingredient.name} />
            <input type="number" bind:value={ingredient.amount} />
            <input type="text" bind:value={ingredient.unit} />
          {/if}
        {/each}
      </ul>
      <li>Dairy?: {recipe.dairyFree}</li>
      <li>Gluten Free?: {recipe.glutenFree}</li>
      <li>Vegan?: {recipe.vegan}</li>
      <li>Vegetarian?: {recipe.vegetarian}</li>
      <ol>
        {#each instructions as instruction}
          <li>{instruction}</li>
        {/each}
      </ol>
    </ul>
  </ul>
  <button class="editOptions" on:click={toggleEditing}>EDIT</button>
</div>
