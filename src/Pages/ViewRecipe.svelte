<script>
  import axios from 'axios';
  import config from '../../config';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';
import Loader from '../Components/Loader.svelte';


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

        const newInstructions = [];

        for (let i = 0; i < steps.length; i++) {
          newInstructions.push(steps[i].step);
        }
        instructions = [...newInstructions];
        const ings = response.data.extendedIngredients;

        const newIngredients = [];
        for (let i = 0; i < ings.length; i++) {
          newIngredients.push({
            name: ings[i].name,
            amount: ings[i].amount,
            unit: ings[i].unit,
          });
        }
        ingredients = [...newIngredients];
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

<div class="single-recipe">
  {#if recipe.length === 0}
  <Loader></Loader>
 {:else}
  <div class="recipe-left">
    <Card>
      <div class="recipe-pic-title">
        <img src={recipe.image} alt="featured recipe" class="recipe-pic" />
        <div class="recipe-info">
          <div class="recipe-title">{recipe.title}</div>
          <div class="info-sub1">
            <div class="cook-time">
              <span class="info1">Cook Time</span>
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <div class="yeild">
              <span class="info1">Portions</span>
              <span> {recipe.servings}</span>
            </div>
          </div>
          <div class="info-sub2">
            {#if recipe.dairyFree}
              <div class="info2">DF</div>
            {/if}
            {#if recipe.glutenFree}
              <div class="info2">GF</div>
            {/if}
            {#if recipe.vegan}
              <div class="info2">Ve</div>
            {/if}
            {#if recipe.vegetarian}
              <div class="info2">V</div>
            {/if}
          </div>
        </div>
      </div>
      <div class="ingredients-sec">
        <div>
          <div class="ingredients-list" id="ingredients-heading">
            <div class="ingredient-unit">Unit</div>
            <div class="ingredient-amount">Amt</div>
            <div class="ingredient-name">Ingredients</div>
          </div>
          {#each ingredients as ingredient}
          <div class="ingredients-list">
            <div class="ingredient-unit">{ingredient.unit}</div>
            <div class="ingredient-amount">{ingredient.amount}</div>
            <div class="ingredient-name">{ingredient.name}</div>
          </div>{/each}
        </div>
        <div class="notes">
          <div id="notes-title">Notes</div>
          <input class="text-input" type="text"/>
        </div>
      </div>
    </Card>
  </div>
  <div class="recipe-right">
    <ol>
      {#each instructions as instruction}
      <li>{instruction}</li>
      {/each}
    </ol>
    <button on:click={postRecipe} class="save-button"> SAVE </button>
  </div>
  {/if}
</div>
