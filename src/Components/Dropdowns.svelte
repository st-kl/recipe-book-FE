<!-- import { Link } from 'svelte-navigator';


<h3>Categories:</h3>
      <label> <input type="checkbox" bind:checked={visible} />Cuisine</label>
      <h3>Dietary</h3>
      <label> <input type="checkbox" bind:checked={visibleDietary} />Dietary</label>
  

    {#if visible}
    <select bind:value={cuisine} on:change={handleChange}>
      {#each cuisines as cuisine}
      <option value={cuisine}>{cuisine}</option>
      {/each}
    </select>{/if}
    {#if visibleDietary}
    <select bind:value={dietary} on:change={handleDiets}>
      {#each diets as diet}
      <option value={diet}>{diet}</option>
      {/each}
    </select>{/if}
    {#each results as result}
    <Link to="/recipe/{result.id}"> -->
