<template>
	<div class="container">
      <b-form @submit.prevent="login" class="form">
          <h2>Login</h2>

          <b-form-group
            label="Email"
            label-for="email">
            <b-form-input id="email"
                type="text"
                v-model="email"
                required></b-form-input>
            </b-form-group>

            <b-form-group
              label="Password"
              label-for="password">

            <b-form-input id="password"
                type="password"
                v-model="password"
                :rows="2"
                :max-rows="6"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button type="submit">Log In</b-button>
            </b-form-group>
      </b-form>
	</div><!-- /.container -->
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
    	email: '',
    	password: ''
    }
  },
  methods: {
  	login() {
  		this.$store.dispatch('login', {email: this.email, password: this.password})
        .then(() => {
          this.$store.commit('triggerLogIn');

          const redirect = this.$route.query.redirect;

          this.$router.push(redirect ? redirect : '/');
        });
  	}
  }
}
</script>

<style lang="css" scoped>
  .form { max-width: 500px; margin: 0 auto; }
  .form h2 { text-align: center; }
</style>
