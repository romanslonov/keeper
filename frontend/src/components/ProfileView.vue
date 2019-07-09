<template>
    <div class="profile-view">
        <div class="profile-view__avatar"></div>
        <div class="profile-view__content">
            <div class="profile-view__name">{{ user.name }}</div>
            <div class="profile-view__description">{{ user.email }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileView',
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
};
</script>

<style>
.profile-view {
    display: flex;
    align-items: center;
}

.profile-view__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--secondary);
    flex-shrink: 0;
}

.profile-view__content {
    margin-left: 8px;
}

.profile-view__description {
    color: var(--secondary);
}
</style>
