<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --body-text-color: #2c3e50;
  --body-bg-color: white;
  --border-color: #E0E4EC;

  --primary: #3DA0FF;
  --secondary: #9DB1D8;

  --sidebar-width: 250px;
  --sidebar-bg-color: #F6F8FB;

  --search-bg-color: #F6F8FB;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--body-bg-color);
  color: var(--body-text-color);
}

.text-secondary {
  color: var(--secondary);
}
</style>
