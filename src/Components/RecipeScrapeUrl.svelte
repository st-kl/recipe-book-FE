<script>
    import axios from 'axios';
    import config from '../../config';
    import Card from '../Components/Card.svelte';
    let url = ''
    let result = '';
    let visible = false;
    
    let options = { headers: {
        'x-rapidapi-key': config.key,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}, params:{number:"5"}};

    const handleScrape = async (event) => {
        event.preventDefault();
        const searchObj = {...options};
        searchObj.params.url = url;
        options = searchObj;
        let scrape = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract', options)
        result = scrape.data;
        visible = true;
        console.log(result);
    }
</script>

<form on:submit={handleScrape}>
    <label for="url">Paste a recipe URL</label>
    <input bind:value={url} type="text" name="url" id="url" placeholder="URL Here">
    <button type="submit">Submit</button>
</form>

{#if visible}
<Card>
    <h3>{result.title}</h3>
    <img src={result.image} alt="recipe" width="100px" height="100px">
    <p>Servings: {result.servings}</p>
    <button>Add</button>
</Card>
{/if}
