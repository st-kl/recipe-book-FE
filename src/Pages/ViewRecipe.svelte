<script>
  import axios from 'axios';
  import config from '../../config';
  import { onMount } from 'svelte';
  import { useParams } from 'svelte-navigator';
  const params = useParams();

  // id = $params.id

  //   let options = {
  //     headers: {
  //       'x-rapidapi-key': config.key,
  //       'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  //     },
  //   };
  console.log($params.id, 'PARAMS<<<<<<<'); 

  onMount(async () => {
    let response = await axios
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${$params.id}/summary`,
        {
          headers: {
            'x-rapidapi-key': config.key,
            'x-rapidapi-host':
              'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  });
</script>

<div>
  <h1>View Recipe Page</h1>
</div>
