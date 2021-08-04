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
    
    <div class="form">
            <form>
                <div class="left">
                    <h4>Basic Info</h4>
                    <label for="name">Name</label>
                    <input bind:value={name} type="text" name="name" placeholder="name" required>
                    <label for="servings">Servings</label>
                    <input bind:value={servings} type="text" name="servings" placeholder="servings" required>
                    <label for="cookTime">Cooking Time</label>
                    <input bind:value={cookingTime} type="text" name="cookTime" placeholder="cooking time (min)" required>
                    <h4>Dietary Info</h4>
                    <label><input type="checkbox" name="vegan" bind:checked={vegan}>Vegan</label>
                    <label><input type="checkbox" name="vegetarian" bind:checked={vegetarian}>Vegetarian</label>
                    <label><input type="checkbox" name="df" bind:checked={df}>Dairy Free</label>
                    <label><input type="checkbox" name="gf" bind:checked={gf}>Gluten Free</label>
                </div>
                <div class="right">
                    <h4>Ingredients</h4>
                    <label for="ing">Name</label>
                    <input bind:value={singleIngredient} type="text" name="ing" placeholder="name" required>
                    <label for="amount">Amount</label>
                    <input bind:value={amount} type="text" name="amount" placeholder="amount" required>
                    <label for="unit">Unit</label>
                    <input bind:value={unit} type="text" name="unit" placeholder="unit" required>
                    <button type="button" on:click={handleIngredients}>Add Ingredient</button>
                    <h4>Instructions</h4>
                    <label for="step">Step</label>
                    <input bind:value={newStep} type="text" name="step" placeholder="step" required>
                    <button type="button" on:click={handleSteps}>Add Step</button>
                    <button class="add-recipe" on:click={handleSubmit}>Add Recipe</button>
                    {#if submitted}
                    <h6>Your recipe has been added to your cookbook!</h6>
                    <button on:click="{() => submitted = !submitted}">Add Another</button>
                    {/if}
                </div>
                </form>
        </div>
    
    <div class="main-content">
    <main>
    <h2>Your Recipe So Far...</h2>
    <section class="ings">
        <h3>Ingredients</h3>
        {#each ingredients as ingredient}
                <p>{ingredient}</p>
                {/each}
            </section>
            <section class="steps">
                <h3>Instructions</h3>
                {#each steps as step, i}
                <p>{i + 1}: {step}</p>
                {/each}
            </section>
        </main>
    </div>

    <style>
        .form {
            background-color: #f4f4f4;
            position: absolute;
            top: 15vh;
            left: 2.5vw;
            width: 33%;
            display: flex;
            flex-direction: row;
            flex-wrap: no wrap;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
        }
        .form label {
            text-align: justify;
            
        }
        .form input {
            text-align: center;
            border-radius: 5px;
        }
        .left, .right {
            display: flex;
            flex-flow: column wrap;
        }
        .add-recipe {
            border: green solid 2px;
        }
        .main-content {
            position: relative;
            left: 40%;
            background-color: white;
            width: 50%;
        }
        .ings, .steps {
            text-align: center;
            border-radius: 5px;
            margin: 25% 0;
        }
        button {
            border-radius: 5px;
        }
        h4 {
            text-align: center;
            text-decoration: underline;
        }
        main {
            position: absolute;
            top: 5vh;
        }
    </style>