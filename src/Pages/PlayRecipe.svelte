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
    <SideNav>
      <div class="ing">
        <h3>Ingredients</h3>
        {#each ingredients as { name, amount, unit }}
          <label>
            <input type="checkbox" />
            {amount}
            {unit}
            {name}
          </label>
        {/each}
        <button
          class={start ? 'start red' : 'start green'}
          on:click={startRecipe}
          >{!start ? "Let's Get Cooking!" : 'I Need A Break!'}</button
        >
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
    </SideNav>
    <div class="main-content">
      <h1>{title}</h1>
      {#if start}
        <main class="steps">
          {#if steps.length !== 0}
            {#each steps.slice(0, endIndex) as { number, step, instructions }, i}
              <p
                class={current === i ? 'current' : ''}
                in:fly={{ delay: 100, y: 200, opacity: 0.9, duration: 1000 }}
                out:fade
              >
                {number}: {step}
              </p>
            {/each}
          {:else}
            {#each instructions.slice(0, endIndex) as instruction, i}
              <p
                class={current === i ? 'current' : ''}
                in:fly={{ delay: 100, y: 200, opacity: 0.9, duration: 1000 }}
                out:fade
              >
                {i + 1}: {instruction}
              </p>
            {/each}
          {/if}
        </main>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ing {
    margin: 1vw;
  }
  .ing h3 {
    text-align: center;
  }
  .ing label,
  input {
    text-align: justify;
  }
  .main-content {
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    background-color: white;
  }

  .main-content h1 {
    position: absolute;
    top: 0.5em;
  }
  .steps {
    position: absolute;
    top: 4em;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
  .steps p {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 30px;
  }
  .current {
    border: solid green 2px;
  }
  .start {
    position: absolute;
    bottom: 8vh;
    left: 2.5vw;
    border-radius: 30px;
    padding: 10px;
  }
  .red {
    border: red solid 2px;
  }
  .green {
    border: green solid 2px;
  }
  .controls {
    display: inline;
    position: relative;
    bottom: 0.3vh;
    border-radius: 50%;
    font-size: 20px;
    padding: 10px;
  }
  .steps {
    text-align: center;
  }
  #back {
    position: absolute;
    right: 7vw;
  }
  #next {
    position: absolute;
    left: 6vw;
  }
</style>
