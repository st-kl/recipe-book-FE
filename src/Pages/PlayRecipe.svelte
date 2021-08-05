<script>
  import { useParams } from 'svelte-navigator';
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import SideNav from '../Components/SideNav.svelte';
  import Card from '../Components/Card.svelte';
  const params = useParams();
  let { id } = $params;
  let recipe;
  let title;
  let start = false;
  let ingredients = [];
  let steps = [];
  let instructions = [];
  let endIndex = 1;
  let current = 0;

  onMount(async () => {
    let response = await axios
      .get(`https://mycookeroo.herokuapp.com/api/recipes?recipeId=${id}`)
      .then((response) => {
        recipe = response.data.recipes[0];
        title = recipe.title;
        ingredients = recipe.ingredients;
        !recipe.steps
          ? (instructions = recipe.instructions)
          : (steps = recipe.steps);
      });
  });

  const startRecipe = () => {
    start = !start;
  };

  const prevStep = () => {
    endIndex = endIndex - 1;
    current = current - 1;
  };

  const nextStep = () => {
    endIndex = endIndex + 1;
    current = current + 1;
  };
</script>

<div>
  {#if !recipe}
    <h1>Loading Recipe to Play...</h1>
  {:else}
    <div class="single-recipe">
      <div class="recipe-left">
        <div class="ing">
          <h3>Ingredients</h3>
          <div class="ingredients-play">
            {#each ingredients as { name, amount, unit }}
              <label>
                <input type="checkbox" id="recipe-check" />
                {amount}
                {unit}
                {name}
              </label>
            {/each}
          </div>
          <button
            class={start ? 'start red' : 'start green'}
            on:click={startRecipe}
            >{!start ? "Let's Get Cooking!" : 'I Need A Break!'}</button
          >
        </div>
      </div>
      <div class="recipe-right">
        <div class="play-title">
          <h2 class="recipe-play-title">{title}</h2>
        </div>
        <div class="play-main">
          {#if start}
            <main class="steps">
              {#if steps.length !== 0}
                {#each steps.slice(0, endIndex) as { number, step, instructions }, i}
                  <p
                    class={current === i ? 'current' : ''}
                    in:fly={{
                      delay: 100,
                      y: 200,
                      opacity: 0.9,
                      duration: 1000,
                    }}
                    out:fade
                  >
                    {number}: {step}
                  </p>
                {/each}
              {:else}
                {#each instructions.slice(0, endIndex) as instruction, i}
                  <p
                    class={current === i ? 'current' : ''}
                    in:fly={{
                      delay: 100,
                      y: 200,
                      opacity: 0.9,
                      duration: 1000,
                    }}
                    out:fade
                  >
                    {i + 1}: {instruction}
                  </p>
                {/each}
              {/if}
            </main>
          {/if}
        </div>
        <div class="play-buttons">
          {#if start}
            <button
              class="controls"
              id="back"
              on:click={prevStep}
              disabled={endIndex <= 1}>←</button
            >
            <button
              class="controls"
              id="next"
              on:click={nextStep}
              disabled={endIndex === steps.length ||
                endIndex === instructions.length}>→</button
            >
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .ing h3 {
    text-align: center;
  }

  .ingredients-play {
    width: 300px;
    border: rgb(132, 8, 144) solid 2px;
    padding: 2em;
  }

  .ing {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 70vh;
  }

  #recipe-check {
    margin-right: 1em;
  }

  .recipe-play-title {
    text-align: center;
    font-family: Satisfy;
  }
  /* .main-content {
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    background-color: white;
  }

  .main-content h1 {
    position: absolute;
    top: 0.5em;
  } */
  /* .steps {
    position: absolute;
    top: 4em;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  } */
  .steps p {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 30px;
  }
  .current {
    border: solid green 2px;
  }
  .start {
    border-radius: 0.2em;
    padding: 10px;
    width: 200px;
  }
  .red {
    border: red solid 2px;
  }

  .red:hover {
    background-color: red;
    color: white;
  }
  .green {
    border: rgb(132, 8, 144) solid 2px;
  }

  .green:hover {
    background-color: rgb(132, 8, 144);
    color: white;
  }
  /* .controls {
    display: inline;
    position: relative;
    bottom: 0.3vh;
    border-radius: 50%;
    font-size: 20px;
    padding: 10px;
  } */
  .steps {
    text-align: center;
  }

  .play-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3em;
  }

  #next,
  #back {
    width: 150px;
    height: 50px;
    font-size: 24px;
    color: rgb(132, 8, 144);
  }

  #next:hover,
  #back:hover {
    background-color: rgb(132, 8, 144);
    color: white;
  }
  /* #back {
    position: absolute;
    right: 7vw;
  }
  #next {
    position: absolute;
    left: 6vw;
  } */
</style>
