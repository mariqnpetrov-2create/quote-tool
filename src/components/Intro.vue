<template>
	<div class="intro">
		<div class="container" v-if="isLogged">
			<h1>Hello</h1>

			<h2>You are Signed In</h2>
		</div><!-- /.container -->

		<div class="container" v-else>
			<h1>Hello</h1>

			<h2>Please Login/Sign Up</h2>
		</div><!-- /.container -->
	</div><!-- /.intro -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Intro',

  data() {
    return {

    }
  },
  computed: {
  	...mapGetters(['isLogged'])
  }
}
</script>

<style lang="css" scoped>
.intro { text-align: center; }

.danger { color: #ff1000; }
</style>
