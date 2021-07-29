<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import Card from '../Components/Card.svelte';
    import Button from '../Components/Button.svelte';
    import config from '../../config';

let recipes = [];
let ingredients = [];
    
onMount(async () => {
    let response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random', { headers: {
        'x-rapidapi-key': config.key,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}
    }).then((response) => {
        recipes = response.data.recipes;
        ingredients = response.data.recipes[0].extendedIngredients;
    });
}); 
</script>

<div>
    <h1>Home Page</h1>
    <Card>
        <ul>{#each recipes as recipe}
            <li>{recipe.title}</li>
            <li>Total Cook Time: {recipe.readyInMinutes} mins</li>
            <li>Ingredients:</li>
            <ul>{#each ingredients as ingredient}
                <li>{ingredient.name}</li>{/each}</ul>
            <li>Dairy?: {recipe.dairyFree}</li>
            <li>Gluten Free?: {recipe.glutenFree}</li>
            <li>Vegan?: {recipe.vegan}</li>
            <li>Vegetarian?: {recipe.vegetarian}</li>
            {/each}</ul>
        <Button />
    </Card>
</div>