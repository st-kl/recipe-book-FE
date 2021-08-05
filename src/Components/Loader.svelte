<div class="loaderWrapper">
  <img class="loader" src="https://image.flaticon.com/icons/png/512/65/65956.png" alt="kangoroo" width="70" height="70"> 
  <p>Loading...</p>
</div>

<style>
  .loader {
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 1s linear infinite;
  }

  .loaderWrapper {
position: absolute;
left: 45%;
bottom: 45%;

  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      10% {transform:translateY(-10px) }
      20% {transform:translateY(0) }
      30% {transform:translateY(-10px) }
      40% {transform:translateY(0) }
  }

  /* Safari */
  @-webkit-keyframes spin {
      0% { transform: rotate(0deg); }
      10% {transform:translateY(-10px) }
      20% {transform:translateY(0) }
      30% {transform:translateY(-10px) }
      40% {transform:translateY(0) }
  }
</style>