<template>
    <div class="main-layout">
        <div class="main-layout__header">
            <top-header />
        </div>
        <div class="main-layout__content">
            <router-view/>
        </div>
        <div class="main-layout__sidebar">
            <sidebar /> 
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/Header';
export default {
    name: 'MainLayout',
    components: { Sidebar, TopHeader },
}
</script>

<style>
.main-layout__header {
    padding-left: var(--sidebar-width);
}
.main-layout__content {
    padding: 32px;
    padding-left: calc(var(--sidebar-width) + 32px);
    min-height: 100vh;
}
</style>
