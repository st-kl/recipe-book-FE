<script>
    let singleIngredient;
    let amount;
    let unit;
    let newStep;
    let ingredients = [];
    let steps = [];

    const handleIngredients = () => {
        const fullIng = amount + " " + unit + " " + singleIngredient;
        ingredients = [...ingredients, fullIng];
        singleIngredient = '';
    }

    const handleSteps = () => {
        steps = [...steps, newStep];
        newStep = '';
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
    </form>
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