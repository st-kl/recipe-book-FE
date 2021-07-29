<script>
    import { Router, Link, Route } from 'svelte-navigator'
import Spoonacular from '../Pages/Spoonacular.svelte';
    </script>
    
    <nav>
        <Link to="/">Login</Link>
        <Link to="home">Home</Link>
       <Link to="mycookbook">MyCookBook</Link>
       <Link to='spoonacular'>Spoonacular</Link>
    </nav>