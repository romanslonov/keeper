<template>
    <div class="profile-view">
        <button class="profile-view__button" @click="open = !open">
            <div class="profile-view__avatar"></div>
            <div class="profile-view__content">
                <div class="profile-view__name">{{ user.name }}</div>
                <div class="profile-view__description">{{ user.email }}</div>
            </div>
        </button>
        <modal :open="open" @close="open = false" title="Profile">
            <template v-slot:default>
                Modal 1
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal';
export default {
    name: 'ProfileView',
    data() {
        return {
            open: false,
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    components: { Modal },
};
</script>

<style>
.profile-view__button {
    display: flex;
    align-items: center;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    border: none;
    text-align: initial;
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
