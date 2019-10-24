<template>
  <div>
    <h1 class="mb-3 text-center">
      Register
    </h1>
    <form @submit.prevent="register">
      <v-textbox
        v-model="form.name"
        required
        size="4"
        label="Name"
        name="name"
        type="text"
        placeholder="Your name"
        class="mb-3"
      />
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
        Register now
      </v-button>
    </form>

    <div class="text-center">
      <span class="text-secondary">Already have an account?</span>
      <nuxt-link to="/auth/login/">
        Login
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
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      return this.$store.dispatch('register', this.form)
        .then(() => this.$router.push('/h'))
        .catch(err => window.console.log(err))
    }
  }
}
</script>
