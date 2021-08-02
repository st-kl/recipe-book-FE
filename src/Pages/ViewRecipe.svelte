<script>
  import axios from 'axios';
  import config from '../../config';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';

  const params = useParams();
  let steps = []; //analyzed instructions key on response object
  let ingredients = []; //extended ingredients key on response object
  let recipe = [];
  let sendRecipe = {};

  // >>>>>>>>>RECIPE ID = $params.id<<<<<<<<<

  // STILL NEEDS SAVE BUTTON TO SAVE RECIPE TO OUR BE

  onMount(async () => {
    let response = await axios
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${$params.id}/information`,
        {
          headers: {
            'x-rapidapi-key': config.key,
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          },
        }
      )
      .then((response) => {
        console.log(response, 'REPONSE<<<<<'); //VIEW RESPONSE OBJ
        recipe = response.data;
        steps = response.data.analyzedInstructions[0].steps;
        ingredients = response.data.extendedIngredients;
        sendRecipe.title = recipe.title;
        sendRecipe.steps = steps;
        sendRecipe.ingredients = ingredients;
        sendRecipe.totalCookTime = recipe.readyInMinutes;
        sendRecipe.dairyFree = recipe.dairyFree;
        sendRecipe.glutenFree = recipe.glutenFree;
        sendRecipe.vegan = recipe.vegan;
        sendRecipe.vegetarian = recipe.vegetarian;
        sendRecipe.image = recipe.image;
        sendRecipe.userId = '1'; //USER ID CURRENTLY HARDCODED
        console.log(sendRecipe, 'RECIPE POST OBJECT<<<<<<<');
      });
  });

  const postRecipe = async () => {
    await axios
      .post(`https://mycookeroo.herokuapp.com/api/recipes`, sendRecipe)
      .then((response) => {
        console.log(response, 'POST RESPONSE<<<<<<<');
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
        <li>Total Cook Time: {recipe.readyInMinutes} mins</li>
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
          {#each steps as step}
            <li>{step.step}</li>
          {/each}
        </ol>
      </ul>
    </ul>
    <Button />
  </Card>
</div>
