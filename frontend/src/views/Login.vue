<template>
    <div>
        <form @submit.prevent="login">
            <label>
                Email
                <input type="email" placeholder="example@gmail.com" v-model="form.email">
            </label>
            <label>
                Password
                <input type="password" v-model="form.password">
            </label>

            <button type="submit">Log In</button>
        </form>

        <div>
            Don't have an account yet? 
            <router-link :to="{ name: 'Register' }">Register</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            return this.$store.dispatch('login', this.form)
                .then(() => this.$router.push({ path: '/' }))
                .catch(err => window.console.log(err));
        },
    },
}
</script>