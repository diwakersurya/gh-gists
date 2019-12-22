<script context="module">
  export async function preload({ params, query }) {
    const response = await this.fetch(`gists.json`, { credentials: "include" });

    const gists = await response.json();

    console.log(gists);
    return { gists };
  }
</script>

<script>
  export let gists;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .gist-nav {
    width: 20%;
    overflow: hidden;
    border-right: 1px solid salmon;
  }
  .gist-nav__item {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>Gists</title>
</svelte:head>
<div class="gist-nav">
  <h1>Recent gists</h1>

  <ul>
    {#each gists as gist}
      <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
      <li class="gist-nav__item">
        <a rel="prefetch" href="gists/{gist.id}">
          {gist.description || gist.html_url}
        </a>
      </li>
    {/each}
  </ul>
</div>
