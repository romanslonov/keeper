<template>
  <div class="profile-view">
    <button class="profile-view__button" @click="modals.user = true">
      <font-awesome-icon class="profile-view__avatar" :icon="['fas', 'user-astronaut']" />
      <div class="profile-view__content">
        <div class="profile-view__name">
          {{ user.name }}
        </div>
        <div class="profile-view__description">
          {{ user.email }}
        </div>
      </div>
    </button>

    <modal :open="modals.user" title="Profile" @close="modals.user = false">
      <div class="profile-view__modal">
        <font-awesome-icon class="profile-view__modal-avatar" :icon="['fas', 'user-astronaut']" />
        <h2>{{ user.name }}</h2>
        <p class="profile-view__modal-email">{{ user.email }}</p>
        <v-button appearance="subtle" @click="logout">
          Logout
        </v-button>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
import VButton from '~/components/Button'
export default {
  name: 'ProfileView',
  components: { Modal, VButton },
  data () {
    return {
      modals: {
        user: false
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.modals.user = false
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
    cursor: pointer;
}

.profile-view__button:hover .profile-view__avatar {
  color: var(--primary);
}

.profile-view__name {
  font-weight: bold;
  color: var(--body-text-color);
}

.profile-view__avatar {
  font-size: 32px;
  color: var(--text-secondary);
}

.profile-view__content {
    margin-left: 8px;
}

.profile-view__description {
    color: var(--text-secondary);
}

.profile-view__modal {
  text-align: center;
}
.profile-view__modal-email {
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.profile-view__modal-avatar {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--text-secondary);
}
</style>
