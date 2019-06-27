<template>
    <div class="main-layout">
        <div id="nav">
            <router-link exact to="/">Upload</router-link> |
            <router-link to="/about">Images</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'MainLayout'
}
</script>
