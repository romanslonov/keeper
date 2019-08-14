<template>
    <div class="search">
        <input class="search__input" type="text" placeholder="Search">
    </div>
</template>


<style>
.search {
  width: 50%;
}
.search__input {
  height: 40px;
  background-color: var(--search-bg-color);
  border: 1px solid var(--border-color);
  font-family: inherit;
  padding: 8px;
  font-size: inherit;
  border-radius: 4px;
  width: 100%;
}
.search__input:focus {
  background-color: white;
  outline: none;
  border-color: var(--primary);
}
</style>
