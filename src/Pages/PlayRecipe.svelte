<script>
    import {useParams} from 'svelte-navigator';
    import {onMount} from 'svelte';
    import axios from 'axios';
    const params = useParams();
    let { id } = $params;
    let recipe;
    let ing = [];

    onMount(async () => {
        let response = await axios.get(`https://mycookeroo.herokuapp.com/api/recipes?recipeId=${id}`).then((response) => {
           recipe = response.data.recipes[0];
           ing = recipe.ingredients;
           
        });
    });
</script>

<div>
    <h1>Play Recipe Page</h1>
    <p>{id}</p>
</div>