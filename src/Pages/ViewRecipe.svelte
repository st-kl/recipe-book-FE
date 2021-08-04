<script>
  import axios from 'axios';
  import config from '../../config';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';

  const params = useParams();
  let instructions = [];
  let ingredients = [];
  let recipe = [];
  let sendRecipe = {};

  // >>>>>>>>>RECIPE ID = $params.id<<<<<<<<<


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
        recipe = response.data;
        const steps = response.data.analyzedInstructions[0].steps;

        const newInstructions = []

        for (let i = 0; i < steps.length; i++) {

          newInstructions.push(steps[i].step);
        }
        instructions = [...newInstructions]
        const ings = response.data.extendedIngredients;

        const newIngredients = []
        for (let i = 0; i < ings.length; i++) {

          newIngredients.push({
            name: ings[i].name,
            amount: ings[i].amount,
            unit: ings[i].unit,
          });
        }
        ingredients = [...newIngredients] 
        sendRecipe.servings = recipe.servings;
        sendRecipe.cookingTime = recipe.CookingMinutes;
        sendRecipe.preparationTime = recipe.preparationMinutes;
        sendRecipe.isPublic = false;
        sendRecipe.notes = '';
        sendRecipe.title = recipe.title;
        sendRecipe.instructions = instructions;
        sendRecipe.ingredients = ingredients;
        sendRecipe.totalTime = recipe.readyInMinutes;
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
  // console.log(ingredients, 'ING');
  // console.log(instructions, 'INST');
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
          {#each instructions as instruction}
            <li>{instruction}</li>
          {/each}
        </ol>
      </ul>
    </ul>
    <Button />
  </Card>
</div>
