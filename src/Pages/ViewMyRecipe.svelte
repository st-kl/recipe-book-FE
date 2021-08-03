<script>
import axios from 'axios';
import { onMount } from 'svelte';
import { useParams } from 'svelte-navigator';
import Card from '../Components/Card.svelte';
import Button from '../Components/Button.svelte';

const params = useParams();
let instructions = [];
let ingredients = [];
let recipe = [];

onMount(async () => {
let response = await axios.get(
    `https://mycookeroo.herokuapp.com/api/recipes?recipeId=${$params.id}`
).then((response) => {
    console.log(response)
})
})
</script>