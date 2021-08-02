<script>
import axios from 'axios';
import config from '../../config';
import {onMount} from 'svelte'
import {useParams} from 'svelte-navigator'
    const params = useParams()
    let recipeId = params

    let options = { headers: {
        'x-rapidapi-key': config.key,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}}

     onMount (async() => {
         let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/summary`, options)}).
         then((response) => { console.log(response.data)})

    

</script>
<div>
    <h1>View Recipe Page</h1>

</div>