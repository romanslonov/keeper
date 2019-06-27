<template>
    <div>
        <form @submit.prevent="register">
            <label>
                Email
                <input 
                    required
                    type="email" 
                    placeholder="example@gmail.com" 
                    v-model="form.email"
                />
            </label>
            <label>
                Name
                <input 
                    required
                    type="text" 
                    placeholder="John Doe" 
                    v-model="form.name"
                />
            </label>
            <label>
                Password
                <input 
                    required
                    type="password" 
                    v-model="form.password"
                />
            </label>

            <button type="submit">Register</button>
        </form>

        <div>
            Already have an account? 
            <router-link :to="{ name: 'Login' }">Log In</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            form: {
                email: '',
                name: '',
                password: '',
            },
        };
    },
    methods: {
        register() {
            this.$store.dispatch('register', this.form)
            .then(() => {
                this.$router.push({ path: '/' });
            })
            .catch(err => window.console.log(err));
      },
    },
};
</script>

