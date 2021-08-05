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
    const fullIng = amount + ' ' + unit + ' ' + singleIngredient;
    ingredients = [...ingredients, fullIng];
    singleIngredient = '';
    amount = '';
    unit = '';
  };

  const handleSteps = () => {
    steps = [...steps, newStep];
    newStep = '';
  };

  const makeSendRecipe = () => {
    sendRecipe.title = name;
    sendRecipe.servings = servings;
    sendRecipe.totalTime = cookingTime;
    sendRecipe.ingredients = [
      { name: singleIngredient, amount: amount, unit: unit },
    ];
    sendRecipe.instructions = steps;
    sendRecipe.vegan = vegan;
    sendRecipe.vegetarian = vegetarian;
    sendRecipe.dairyFree = df;
    sendRecipe.glutenFree = gf;
    sendRecipe.userId = '1';
    sendRecipe.image = 'https://thumbs.dreamstime.com/b/healthy-food-background-fruits-vegetables-cereal-nuts-superfood-dietary-balanced-vegetarian-eating-products-kitchen-143677456.jpg';
  };

  const handleSubmit = async () => {
    makeSendRecipe();
    submitted = true;
    name = '';
    servings = '';
    cookingTime = '';
    singleIngredient = '';
    amount = '';
    unit = '';
    newStep = '';
    ingredients = [];
    steps = [];
    vegan = false;
    vegetarian = false;
    df = false;
    gf = false;
    await axios
      .post(`https://mycookeroo.herokuapp.com/api/recipes`, sendRecipe)
      .then((response) => {
        console.log(response);
      });
  };
</script>

<div class="single-recipe">
  <div class="create-recipe-page">
    <form id="create-recipe-form">
      <div class="recipe-left" id="recipe-left">
        <div class="recipe-left-top">
          <div class="basic-info">
            <h4 id="info-titles3">Basic Info</h4>
            <label for="name">Name</label>
            <input
              bind:value={name}
              type="text"
              name="name"
              placeholder="name"
              required
              class="create-input"
            />
            <label for="servings">Servings</label>
            <input
              bind:value={servings}
              type="text"
              name="servings"
              placeholder="servings"
              required
              class="create-input"
            />
            <label for="cookTime">Cooking Time</label>
            <input
              bind:value={cookingTime}
              type="text"
              name="cookTime"
              placeholder="cooking time (min)"
              required
              class="create-input"
            />
          </div>
          <div class="dietary-info">
            <h4 id="info-titles1">Dietary Info</h4>
            <label
              ><input
                type="checkbox"
                name="vegan"
                bind:checked={vegan}
              />Vegan</label
            >
            <label
              ><input
                type="checkbox"
                name="vegetarian"
                bind:checked={vegetarian}
              />Vegetarian</label
            >
            <label
              ><input type="checkbox" name="df" bind:checked={df} />Dairy Free</label
            >
            <label
              ><input type="checkbox" name="gf" bind:checked={gf} />Gluten Free</label
            >
          </div>
        </div>
        <div class="recipe-left-bottom">
          <div class="ingredients-div">
            <h4 id="info-titles2">Ingredients</h4>
            <label for="ing">Name</label>
            <input
              bind:value={singleIngredient}
              type="text"
              name="ing"
              placeholder="name"
              required
              class="create-input"
            />
            <label for="amount">Amount</label>
            <input
              bind:value={amount}
              type="text"
              name="amount"
              placeholder="amount"
              required
              class="create-input"
            />
            <label for="unit">Unit</label>
            <input
              bind:value={unit}
              type="text"
              name="unit"
              placeholder="unit"
              required
              class="create-input"
            />
          </div>
          <div class="instructions-div">
            <h4 id="info-titles4">Instructions</h4>
            <label for="step">Step</label>
            <input
              bind:value={newStep}
              type="text"
              name="step"
              placeholder="step"
              required
              class="create-input"
              id="step-input"
            />
            <button
              id="add-step-button"
              class="handler-button"
              type="button"
              on:click={handleSteps}>Add Step</button
            >
            <button
              class="handler-button"
              type="button"
              on:click={handleIngredients}>Add Ingredient</button
            >
          </div>
        </div>
        <div class="create-recipe-button">
          <button class="add-recipe" on:click={handleSubmit}>Add Recipe</button>
        </div>
      </div>
    </form>
  </div>

  <div class="recipe-right" id="recipe-right-update">
    <div class="recipe-so-far-title">
      <h2 id="so-far-title">Your Recipe So Far...</h2>
    </div>

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
    {#if submitted}
      <h6>Your recipe has been added to your cookbook!</h6>
    {/if}
  </div>
</div>

<style>
  /* .form {
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
  } */

  .ings,
  .steps {
    height: 200px;
  }
  .create-input {
    height: 30px;
  }

  #so-far-title {
    margin-bottom: 2em;
  }
  #step-input {
    margin-bottom: 5px;
  }
  #create-recipe-form {
    width: 50vw;
  }
  .recipe-left-top,
  .recipe-left-bottom {
    display: flex;
    justify-content: space-between;
  }

  .recipe-right {
    height: 70vh;
    text-align: center;
    display: block;
  }

  #recipe-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 40vw;
    height: 80vh;
    padding: 1em 2em 0 2em;
  }

  #info-titles1,
  #info-titles2,
  #info-titles3,
  #info-titles4 {
    margin-top: 0;
    font-size: 18px;
  }

  .basic-info,
  .dietary-info,
  .instructions-div,
  .ingredients-div {
    width: 170px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
  }

  /* .form label {
    text-align: justify;
  }
  .form input {
    text-align: center;
    border-radius: 5px;
  } */
  /* .left, .right {
            display: flex;
            flex-flow: column wrap;
        } */
  .add-recipe {
    border: rgb(132, 8, 144) solid 2px;
    width: 240px;
  }
  .handler-button {
    border: rgb(132, 8, 144) solid 2px;
  }

  .add-recipe:hover,
  .handler-button:hover {
    background-color: rgb(132, 8, 144);
    color: white;
  }

  .create-recipe-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* .main-content {
    position: relative;
    left: 40%;
    background-color: white;
    width: 50%;
  } */
  .ings,
  .steps {
    text-align: center;
    border-radius: 5px;
  }
  /* button {
    border-radius: 5px;
  }
  h4 {
    text-align: center;
    text-decoration: underline;
  }
  main {
    position: absolute;
    top: 5vh;
  } */
</style>
