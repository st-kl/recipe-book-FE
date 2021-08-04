<script>
    import axios from 'axios';
    let name;
    let servings;
    let cookingTime;
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
    let submitted;
    let sendRecipe = {};

    const handleIngredients = () => {
        const fullIng = amount + " " + unit + " " + singleIngredient;
        ingredients = [...ingredients, fullIng];
        singleIngredient = '';
    }

    const handleSteps = () => {
        steps = [...steps, newStep];
        newStep = '';
    }

    const makeSendRecipe = () => {
        sendRecipe.title = name;
        sendRecipe.servings = servings;
        sendRecipe.totalTime = cookingTime;
        sendRecipe.ingredients = [{name: singleIngredient, amount: amount, unit: unit}];
        sendRecipe.instructions = steps;
        sendRecipe.vegan = vegan;
        sendRecipe.vegetarian = vegetarian;
        sendRecipe.dairyFree = df;
        sendRecipe.glutenFree = gf;
        sendRecipe.userId = '1';
    }

    const handleSubmit = async () => {
        makeSendRecipe();
        submitted = true;
        name = "";
        servings = "";
        cookingTime = "";
        singleIngredient = "";
        amount = "";
        unit = "";
        newStep = "";
        ingredients = [];
        steps = [];
        vegan = false;
        vegetarian = false;
        df = false;
        gf = false;
        await axios.post(`https://mycookeroo.herokuapp.com/api/recipes`, sendRecipe).then((response) => {
            console.log(response);
        });
    }
    </script>


<div>
    <h1>Create Recipe Page</h1>
    <form>
        <label for="name">Name</label>
        <input bind:value={name} type="text" name="name" placeholder="name" required>
        <label for="servings">Servings</label>
        <input bind:value={servings} type="text" name="servings" placeholder="servings" required>
        <label for="cookTime">Cooking Time</label>
        <input bind:value={cookingTime} type="text" name="cookTime" placeholder="cooking time (min)" required>
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
        {#if submitted}
        <h4>Your recipe has been added to your cookbook!</h4>
        <button on:click="{() => submitted = !submitted}">Add Another</button>
        {/if}
    </main>
</div>