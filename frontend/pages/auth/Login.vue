<template>
  <div>
    <h1 class="mb-3 text-center">
      Login
    </h1>
    <form @submit.prevent="login">
      <v-textbox
        v-model="form.email"
        required
        size="4"
        label="Email"
        name="email"
        type="email"
        placeholder="example@gmail.com"
        class="mb-3"
      />
      <v-textbox
        v-model="form.password"
        required
        size="4"
        label="Password"
        name="password"
        type="password"
        placeholder="*****"
        class="mb-3"
      />

      <v-button type="submit" appearance="primary" fullwidth size="4" class="mb-3">
        Log In
      </v-button>
    </form>

    <div class="text-center">
      <span class="text-secondary">Don't have an account yet?</span>
      <nuxt-link to="/auth/register/">
        Register now
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import VTextbox from '~/components/Textbox.vue'
import VButton from '~/components/Button.vue'
export default {
  layout: 'auth',
  components: { VTextbox, VButton },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      return this.$store.dispatch('login', this.form)
        .then(() => this.$router.push('/h'))
        .catch(err => window.console.log(err))
    }
  }
}
</script>
