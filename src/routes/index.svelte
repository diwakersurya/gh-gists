<script>
  import { goto } from "@sapper/app";
  const handleButtonClick = event => {
    goto(`/login`);
  };
</script>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }
  .button {
    border: 2px solid #008cba;
    border-radius: 5px;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
  }
  .button:hover {
    background-color: #008cba;
    color: white;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Gists</title>
</svelte:head>

<h1>Welcom to gists. To get started click login button!</h1>
<div class="button-container">
  <button class="button" on:click={handleButtonClick}>Login</button>
</div>
