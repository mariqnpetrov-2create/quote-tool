<template>
	<div class="container">
		<b-form @submit.prevent="signUp" class="form">
			<h2>Sign Up</h2>

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
                  <b-button type="submit">Sign Up</b-button>
              </b-form-group>
        </b-form>
	</div><!-- /.container -->
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'SignUp',

  data () {
    return {
    	email: '',
    	password: ''
    }
  },

  methods: {
  	signUp() {
  		this.$store.dispatch('signup', {email: this.email, password: this.password})
        .then((user) => {
          this.$store.commit('auth/login', user);

          this.$router.push('/');
        })
  	}
  }
}
</script>

<style lang="css" scoped>
.form { max-width: 500px; margin: 0 auto; }
.form h2 { text-align: center; }
</style>
