<script>
    import {useParams} from 'svelte-navigator';
    const params = useParams();
    let recipeId = $params;
    console.log(recipeId);
</script>

<div>
    <h1>Play Recipe Page</h1>
    <p>{recipeId.id}</p>
</div>