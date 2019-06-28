<template>
    <div class="main-layout">
        <div class="main-layout__content">
            <router-view/>
        </div>
        <div class="main-layout__sidebar">
            <Sidebar /> 
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
export default {
    name: 'MainLayout',
    components: { Sidebar },
}
</script>

<style>
.main-layout__content {
    padding: 32px;
    padding-right: calc(280px + 32px);
}
</style>
