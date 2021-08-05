<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  import Card from '../Components/Card.svelte';
  import Button from '../Components/Button.svelte';
import Loader from '../Components/Loader.svelte';
  

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
              <span>{recipe.totalTime}</span>
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
          <input class="text-input" type="text" />
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
    <!-- <button class="save-button" on:click={playRecipe}>PLAY RECIPE</button> -->
    <button class="save-button" on:click={toggleEditing}>EDIT RECIPE</button>
  </div>
  {/if}
</div>
