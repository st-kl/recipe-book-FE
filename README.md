# Recipe Book API

## Project

This is the frontend for **Cookeroo**, my final coding bootcamp project at Northcoders (collaborators: [MariusCNicolae](https://github.com/MariusCNicolae), [sirKevlar](https://github.com/sirKevlar), [TeeBee20](https://github.com/TeeBee20)).

Cookeroo is a web application and online recipe book, into which recipes can be imported via a third party API, edited, refined and then viewed in an interactive way.\
User and recipe data is stored in a non-relational database (mongoDB), which is managed by an [API](https://github.com/two-wheels01/recipe-book-BE.git) we built ourselves.

### Tech Stack

- Framework: `Svelte`
- API requests: `axios`
- Authentication: `auth0`

### App Features

- Recipe Search
  - Search recipes by name, cuisine or dietary requirements. Recipes are fetched from a third party API (Spoonacular), displayed to the user and can be saved to your personal recipe book.
- My Recipes
  - An overview of all your saved recipes.
- View Recipe
  - Shows all the information of a recipe, and offers 2 options:
    - **Edit** Recipe can be edited straight away
    - **Play** Ingredients are listed with a checkbox to be able to tick them off; instructions are "played" step by step, i.e. displayed one after another by using the next/previous/pause control buttons.
- Create Recipe
  - A new recipe can be created and saved to your recipe book.

---

## Version Requirements

- `Node.js`: 16.0.0 or higher
