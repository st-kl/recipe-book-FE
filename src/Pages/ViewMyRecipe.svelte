<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';

  const params = useParams();
  let instructions = [];
  let ingredients = [];
  let recipe = [];
  console.log($params.recipeId, 'PARAMS<<<<<<<<');

  onMount(async () => {
    let response = await axios
      .get(
        `https://mycookeroo.herokuapp.com/api/recipes?recipeId=${$params.recipeId}`
      )
      .then((response) => {
        recipe = response.data.recipes[0];
        instructions = recipe.steps;
        ingredients = recipe.ingredients;
        console.log(recipe, 'RECIPE<<<<<<<');
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
  <Card>
    <ul>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt="featured recipe" class="recipe-pic" />
      <button on:click={postRecipe} class="save-button"> SAVE </button>
      <ul>
        <li>Total Cook Time: {recipe.totalCookTime} mins</li>
        <li>Ingredients:</li>
        <ul>
          {#each ingredients as ingredient}
            <li>{ingredient.name}</li>{/each}
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
    <Button />
  </Card>
</div>
