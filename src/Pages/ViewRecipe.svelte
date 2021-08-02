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
        console.log(response, 'REPONSE<<<<<'); //VIEW RESPONSE OBJ
        recipe = response.data;
        steps = response.data.analyzedInstructions;
        ingredients = response.data.extendedIngredients;
        console.log(steps, 'RECIPE-steps', ingredients, 'INGREDIENTS');
      });
  });
</script>

<div>
  <h1>View Recipe Page</h1>
  <Card>
    <ul>
      <ul>
        <li>{recipe.title}</li>
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
      </ul>
    </ul>
    <Button />
  </Card>
</div>
