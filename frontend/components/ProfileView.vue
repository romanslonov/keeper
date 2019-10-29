<template>
  <div class="profile-view">
    <button class="profile-view__button">
      <div class="profile-view__avatar" />
      <div class="profile-view__content">
        <div class="profile-view__name">
          {{ user.name }}
        </div>
        <div class="profile-view__description">
          {{ user.email }}
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
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
    padding: 0;
    margin: 0;
}

.profile-view__name {
  font-weight: bold;
  color: var(--body-text-color);
}

.profile-view__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--gray-600);
    flex-shrink: 0;
}

.profile-view__content {
    margin-left: 8px;
}

.profile-view__description {
    color: var(--text-secondary);
}
</style>
