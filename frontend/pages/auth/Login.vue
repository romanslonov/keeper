<template>
  <div>
    <form @submit.prevent="login">
      <label>
        Email
        <input v-model="form.email" type="email" placeholder="example@gmail.com">
      </label>
      <label>
        Password
        <input v-model="form.password" type="password">
      </label>

      <button type="submit">
        Log In
      </button>
    </form>

    <div>
      Don't have an account yet?
      <router-link to="/auth/register/">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  name: 'Login',
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
        .then(() => this.$router.push('/h/'))
        .catch(err => window.console.log(err))
    }
  }
}
</script>
