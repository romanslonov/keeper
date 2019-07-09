<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --primary: #3DA0FF;
  --secondary: #9DB1D8;

  --sidebar-width: 250px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #151618;
  color: white;
}

.text-secondary {
  color: var(--secondary);
}
</style>
