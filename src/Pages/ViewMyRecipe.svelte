<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';

  let editOptions = false;
  const params = useParams();
  const toggleEditting = () => (editOptions = !editOptions);
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
        instructions = recipe.steps;
        ingredients = recipe.ingredients;
      });
  });
  // THIS FUNCTION NEEDS TO BE
  const postRecipe = async () => {
    await axios
      .post(`https://mycookeroo.herokuapp.com/api/recipes`, sendRecipe)
      .then((response) => {
        console.log(recipe, 'POST ZZZZZZ<<<<<<<');
      });
  };
</script>

<div>
  <h1>View Recipe Page</h1>
  <button>
    <Card>
    <ul>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt="featured recipe" class="recipe-pic" />
      <button on:click={postRecipe} class="save-button"> SAVE </button>
      <ul>
        <li>Total Cook Time: {recipe.totalCookTime} mins</li>
        <li>Ingredients:</li>
        <ul>
          {#each ingredients as ingredient, i}
            <li id={i}>{ingredient.name}</li>
            {#if editOptions}
              <input type="text" bind:value={ingredient.name} />
            {/if}
          {/each}
        </ul>
        <li>Dairy?: {recipe.dairyFree}</li>
        <li>Gluten Free?: {recipe.glutenFree}</li>
        <li>Vegan?: {recipe.vegan}</li>
        <li>Vegetarian?: {recipe.vegetarian}</li>
        <ol>
          {#each instructions as instruction}
            <li>{instruction.step}</li>
          {/each}
        </ol>
      </ul>
    </ul>
    <button class="editOptions" on:click={toggleEditting} />EDIT</button>
  </Card>
</div>
