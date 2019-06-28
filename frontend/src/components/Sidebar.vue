<template>
    <div class="sidebar">
        <b>{{ user.name }}</b>
        <div>{{ user.email }}</div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
}
</script>


<style>
.sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    padding: 16px;
    background-color: hsl(222, 4%, 14%);
}
</style>

