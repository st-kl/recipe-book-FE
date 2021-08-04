<script>
    import axios from 'axios';
    let singleIngredient;
    let amount;
    let unit;
    let newStep;
    let ingredients = [];
    let steps = [];
    let vegan = false;
    let vegetarian = false;
    let df = false;
    let gf = false;
    let sendRecipe = {};
    //make sure all fields are bound to variables in order to send post request
    //hardcode user id on post request

    const handleIngredients = () => {
        const fullIng = amount + " " + unit + " " + singleIngredient;
        ingredients = [...ingredients, fullIng];
        singleIngredient = '';
    }

    const handleSteps = () => {
        steps = [...steps, newStep];
        newStep = '';
    }

    const handleSubmit = async () => {
        await axios.post(`https://mycookeroo.herokuapp.com/api/recipes`, sendRecipe).then((response) => {
            console.log(response, "<< post response");
        })
    }

</script>


<div>
    <h1>Create Recipe Page</h1>
    <form>
        <label for="name">Name</label>
        <input type="text" name="name" placeholder="name" required>
        <label for="servings">Servings</label>
        <input type="text" name="servings" placeholder="servings" required>
        <label for="cookTime">Cooking Time</label>
        <input type="text" name="cookTime" placeholder="cooking time (min)" required>
        <h4>Ingredients - Click to add each one</h4>
        <label for="ing">Name</label>
        <input bind:value={singleIngredient} type="text" name="ing" placeholder="name" required>
        <label for="amount">Amount</label>
        <input bind:value={amount} type="text" name="amount" placeholder="amount" required>
        <label for="unit">Unit</label>
        <input bind:value={unit} type="text" name="unit" placeholder="unit" required>
        <button type="button" on:click={handleIngredients}>+</button>
        <h4>Instructions - Click to add each one</h4>
        <label for="step">Step</label>
        <input bind:value={newStep} type="text" name="step" placeholder="step" required>
        <button type="button" on:click={handleSteps}>+</button>
        <h4>Dietary Info - Click all that apply</h4>
        <label><input type="checkbox" name="vegan" bind:checked={vegan}>Vegan</label>
        <label><input type="checkbox" name="vegetarian" bind:checked={vegetarian}>Vegetarian</label>
        <label><input type="checkbox" name="df" bind:checked={df}>Dairy Free</label>
        <label><input type="checkbox" name="gf" bind:checked={gf}>Gluten Free</label>
        </form>
        <button on:click={handleSubmit}>Submit</button>
        <main>
        <section class="ings">
            {#each ingredients as ingredient}
            <p>{ingredient}</p>
            {/each}
        </section>
        <section class="steps">
            {#each steps as step, i}
            <p>{i + 1}: {step}</p>
            {/each}
        </section>
    </main>
</div>